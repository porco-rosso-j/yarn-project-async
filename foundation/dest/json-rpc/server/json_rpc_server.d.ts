import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import { type JsonClassConverterInput, type StringClassConverterInput } from '../class_converter.js';
import { type ClassMaps, JsonProxy } from './json_proxy.js';
/**
 * JsonRpcServer.
 * Minimal, dev-friendly mechanism to create a server from an object.
 */
export declare class JsonRpcServer {
    private handler;
    private stringClassMap;
    private objectClassMap;
    /** List of methods to disallow from calling remotely */
    readonly disallowedMethods: string[];
    private log;
    /**
     * The proxy object.
     */
    proxy: JsonProxy;
    constructor(handler: object, stringClassMap: StringClassConverterInput, objectClassMap: JsonClassConverterInput, 
    /** List of methods to disallow from calling remotely */
    disallowedMethods?: string[], log?: import("../../log/logger.js").Logger);
    /**
     * Get an express app object.
     * @param prefix - Our server prefix.
     * @returns The app object.
     */
    getApp(prefix?: string): Koa<Koa.DefaultState, Koa.DefaultContext>;
    /**
     * Get a router object wrapping our RPC class.
     * @param prefix - The server prefix.
     * @returns The router object.
     */
    private getRouter;
    /**
     * Start this server with koa.
     * @param port - Port number.
     * @param prefix - Prefix string.
     */
    start(port: number, prefix?: string): void;
    /**
     * Get a list of methods.
     * @returns A list of methods.
     */
    getMethods(): string[];
    /**
     * Gets the class maps that were used to create the proxy.
     * @returns The string & object class maps.
     */
    getClassMaps(): ClassMaps;
    /**
     * Call an RPC method.
     * @param methodName - The RPC method.
     * @param jsonParams - The RPG parameters.
     * @param skipConversion - Whether to skip conversion of the parameters.
     * @returns The remote result.
     */
    call(methodName: string, jsonParams: any[] | undefined, skipConversion: boolean): Promise<any>;
}
/**
 * Creates a router for handling a plain status request that will return 200 status when running.
 * @param apiPrefix - The prefix to use for all api requests
 * @returns - The router for handling status requests.
 */
export declare function createStatusRouter(apiPrefix?: string): Router<any, {}>;
/**
 * Creates an http server that forwards calls to the underlying instance and starts it on the given port.
 * @param instance - Instance to wrap in a JSON-RPC server.
 * @param jsonRpcFactoryFunc - Function that wraps the instance in a JSON-RPC server.
 * @param port - Port to listen in.
 * @returns A running http server.
 */
export declare function startHttpRpcServer<T>(name: string, instance: T, jsonRpcFactoryFunc: (instance: T) => JsonRpcServer, port: string | number): http.Server;
/**
 * List of namespace to server instance.
 */
export type ServerList = {
    /** name of the service to be used for namespacing */
    [name: string]: JsonRpcServer;
}[];
/**
 * Creates a single JsonRpcServer from multiple servers.
 * @param servers - List of servers to be combined into a single server, passed as ServerList.
 * @returns A single JsonRpcServer with namespaced methods.
 */
export declare function createNamespacedJsonRpcServer(servers: ServerList, log?: import("../../log/logger.js").Logger): JsonRpcServer;
//# sourceMappingURL=json_rpc_server.d.ts.map