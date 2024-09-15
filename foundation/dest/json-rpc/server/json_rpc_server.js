import cors from '@koa/cors';
import http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import Router from 'koa-router';
import { createDebugLogger } from '../../log/index.js';
import { convertBigintsInObj } from '../convert.js';
import { JsonProxy } from './json_proxy.js';
/**
 * JsonRpcServer.
 * Minimal, dev-friendly mechanism to create a server from an object.
 */
export class JsonRpcServer {
    constructor(handler, stringClassMap, objectClassMap, 
    /** List of methods to disallow from calling remotely */
    disallowedMethods = [], log = createDebugLogger('json-rpc:server')) {
        this.handler = handler;
        this.stringClassMap = stringClassMap;
        this.objectClassMap = objectClassMap;
        this.disallowedMethods = disallowedMethods;
        this.log = log;
        this.proxy = new JsonProxy(handler, stringClassMap, objectClassMap);
    }
    /**
     * Get an express app object.
     * @param prefix - Our server prefix.
     * @returns The app object.
     */
    getApp(prefix = '') {
        const router = this.getRouter(prefix);
        const exceptionHandler = async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                this.log.error(err);
                if (err instanceof SyntaxError) {
                    ctx.status = 400;
                    ctx.body = {
                        jsonrpc: '2.0',
                        id: null,
                        error: {
                            code: -32700,
                            message: 'Parse error',
                        },
                    };
                }
                else {
                    ctx.status = 500;
                    ctx.body = {
                        jsonrpc: '2.0',
                        id: null,
                        error: {
                            code: -32603,
                            message: 'Internal error',
                        },
                    };
                }
            }
        };
        const app = new Koa();
        app.on('error', error => {
            this.log.error(`Error on API handler: ${error}`);
        });
        app.use(exceptionHandler);
        app.use(compress({ br: false }));
        app.use(bodyParser({
            jsonLimit: '50mb',
            enableTypes: ['json'],
            detectJSON: () => true,
        }));
        app.use(cors());
        app.use(router.routes());
        app.use(router.allowedMethods());
        return app;
    }
    /**
     * Get a router object wrapping our RPC class.
     * @param prefix - The server prefix.
     * @returns The router object.
     */
    getRouter(prefix) {
        const router = new Router({ prefix });
        const proto = Object.getPrototypeOf(this.handler);
        // "JSON RPC mode" where a single endpoint is used and the method is given in the request body
        router.post('/', async (ctx) => {
            const { params = [], jsonrpc, id, method } = ctx.request.body;
            // Ignore if not a function
            if (method === 'constructor' || typeof proto[method] !== 'function' || this.disallowedMethods.includes(method)) {
                ctx.status = 400;
                ctx.body = {
                    jsonrpc,
                    id,
                    error: {
                        code: -32601,
                        message: `Method not found: ${method}`,
                    },
                };
            }
            else {
                try {
                    const result = await this.proxy.call(method, params);
                    ctx.body = {
                        jsonrpc,
                        id,
                        result: convertBigintsInObj(result),
                    };
                    ctx.status = 200;
                }
                catch (err) {
                    // Propagate the error message to the client. Plenty of the errors are expected to occur (e.g. adding
                    // a duplicate recipient) so this is necessary.
                    ctx.status = 400;
                    ctx.body = {
                        jsonrpc,
                        id,
                        error: {
                            // TODO assign error codes - https://github.com/AztecProtocol/aztec-packages/issues/2633
                            code: -32000,
                            message: err.message,
                        },
                    };
                }
            }
        });
        return router;
    }
    /**
     * Start this server with koa.
     * @param port - Port number.
     * @param prefix - Prefix string.
     */
    start(port, prefix = '') {
        const httpServer = http.createServer(this.getApp(prefix).callback());
        httpServer.listen(port);
    }
    /**
     * Get a list of methods.
     * @returns A list of methods.
     */
    getMethods() {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(this.handler));
    }
    /**
     * Gets the class maps that were used to create the proxy.
     * @returns The string & object class maps.
     */
    getClassMaps() {
        return { stringClassMap: this.stringClassMap, objectClassMap: this.objectClassMap };
    }
    /**
     * Call an RPC method.
     * @param methodName - The RPC method.
     * @param jsonParams - The RPG parameters.
     * @param skipConversion - Whether to skip conversion of the parameters.
     * @returns The remote result.
     */
    async call(methodName, jsonParams = [], skipConversion) {
        return await this.proxy.call(methodName, jsonParams, skipConversion);
    }
}
/**
 * Creates a router for handling a plain status request that will return 200 status when running.
 * @param apiPrefix - The prefix to use for all api requests
 * @returns - The router for handling status requests.
 */
export function createStatusRouter(apiPrefix = '') {
    const router = new Router({ prefix: `${apiPrefix}` });
    router.get('/status', (ctx) => {
        ctx.status = 200;
    });
    return router;
}
/**
 * Creates an http server that forwards calls to the underlying instance and starts it on the given port.
 * @param instance - Instance to wrap in a JSON-RPC server.
 * @param jsonRpcFactoryFunc - Function that wraps the instance in a JSON-RPC server.
 * @param port - Port to listen in.
 * @returns A running http server.
 */
export function startHttpRpcServer(name, instance, jsonRpcFactoryFunc, port) {
    const rpcServer = jsonRpcFactoryFunc(instance);
    const namespacedServer = createNamespacedJsonRpcServer([{ [name]: rpcServer }]);
    const app = namespacedServer.getApp();
    const httpServer = http.createServer(app.callback());
    httpServer.listen(port);
    return httpServer;
}
/**
 * Creates a single JsonRpcServer from multiple servers.
 * @param servers - List of servers to be combined into a single server, passed as ServerList.
 * @returns A single JsonRpcServer with namespaced methods.
 */
export function createNamespacedJsonRpcServer(servers, log = createDebugLogger('json-rpc:multi-server')) {
    const handler = {};
    const disallowedMethods = [];
    const classMapsArr = [];
    for (const serverEntry of servers) {
        const [namespace, server] = Object.entries(serverEntry)[0];
        const serverMethods = server.getMethods();
        for (const method of serverMethods) {
            const namespacedMethod = `${namespace}_${method}`;
            handler[namespacedMethod] = (...args) => {
                return server.call(method, args, true);
            };
        }
        // get the combined disallowed methods from all servers.
        disallowedMethods.push(...server.disallowedMethods.map(method => `${namespace}_${method}`));
        // get the combined classmaps from all servers.
        const classMap = server.getClassMaps();
        classMapsArr.push({
            stringClassMap: classMap.stringClassMap,
            objectClassMap: classMap.objectClassMap,
        });
    }
    // Get the combined stringClassMap & objectClassMap from all servers
    const classMaps = classMapsArr.reduce((acc, curr) => {
        return {
            stringClassMap: { ...acc.stringClassMap, ...curr.stringClassMap },
            objectClassMap: { ...acc.objectClassMap, ...curr.objectClassMap },
        };
    }, { stringClassMap: {}, objectClassMap: {} });
    return new JsonRpcServer(Object.create(handler), classMaps.stringClassMap, classMaps.objectClassMap, [], log);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9ycGNfc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzb24tcnBjL3NlcnZlci9qc29uX3JwY19zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBQzdCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUVoQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFrQixTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUt4QixZQUNVLE9BQWUsRUFDZixjQUF5QyxFQUN6QyxjQUF1QztJQUMvQyx3REFBd0Q7SUFDeEMsb0JBQThCLEVBQUUsRUFDeEMsTUFBTSxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUwxQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQTJCO1FBQ3pDLG1CQUFjLEdBQWQsY0FBYyxDQUF5QjtRQUUvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWU7UUFDeEMsUUFBRyxHQUFILEdBQUcsQ0FBdUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxT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