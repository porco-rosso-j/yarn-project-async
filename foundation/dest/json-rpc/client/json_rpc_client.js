import { format } from 'util';
import { createDebugLogger } from '../../log/index.js';
import { NoRetryError, makeBackoff, retry } from '../../retry/index.js';
import { ClassConverter } from '../class_converter.js';
import { JsonStringify, convertFromJsonObj, convertToJsonObj } from '../convert.js';
export { JsonStringify } from '../convert.js';
const log = createDebugLogger('json-rpc:json_rpc_client');
/**
 * A normal fetch function that does not retry.
 * Alternatives are a fetch function with retries, or a mocked fetch.
 * @param host - The host URL.
 * @param method - The RPC method name.
 * @param body - The RPC payload.
 * @param noRetry - Whether to throw a `NoRetryError` in case the response is a 5xx error and the body contains an error
 *                  message (see `retry` function for more details).
 * @returns The parsed JSON response, or throws an error.
 */
export async function defaultFetch(host, rpcMethod, body, useApiEndpoints, noRetry = false) {
    log.debug(format(`JsonRpcClient.fetch`, host, rpcMethod, '->', body));
    let resp;
    if (useApiEndpoints) {
        resp = await fetch(`${host}/${rpcMethod}`, {
            method: 'POST',
            body: JsonStringify(body),
            headers: { 'content-type': 'application/json' },
        });
    }
    else {
        resp = await fetch(host, {
            method: 'POST',
            body: JsonStringify({ ...body, method: rpcMethod }),
            headers: { 'content-type': 'application/json' },
        });
    }
    let responseJson;
    try {
        responseJson = await resp.json();
    }
    catch (err) {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        throw new Error(`Failed to parse body as JSON: ${resp.text()}`);
    }
    if (!resp.ok) {
        if (noRetry || (resp.status >= 400 && resp.status < 500)) {
            throw new NoRetryError('(JSON-RPC PROPAGATED) ' + responseJson.error.message);
        }
        else {
            throw new Error('(JSON-RPC PROPAGATED) ' + responseJson.error.message);
        }
    }
    return responseJson;
}
/**
 * Makes a fetch function that retries based on the given attempts.
 * @param retries - Sequence of intervals (in seconds) to retry.
 * @param noRetry - Whether to stop retries on server errors.
 * @param log - Optional logger for logging attempts.
 * @returns A fetch function.
 */
export function makeFetch(retries, noRetry, log) {
    return async (host, rpcMethod, body, useApiEndpoints) => {
        return await retry(() => defaultFetch(host, rpcMethod, body, useApiEndpoints, noRetry), `JsonRpcClient request ${rpcMethod} to ${host}`, makeBackoff(retries), log, false);
    };
}
/**
 * Creates a Proxy object that delegates over RPC and satisfies RemoteObject<T>.
 * The server should have ran new JsonRpcServer().
 * @param host - The host URL.
 * @param stringClassMap - A map of class names to string representations.
 * @param objectClassMap - A map of class names to class constructors.
 * @param useApiEndpoints - Whether to use the API endpoints or the default RPC endpoint.
 * @param namespaceMethods - String value (or false/empty) to namespace all methods sent to the server. e.g. 'getInfo' -\> 'pxe_getInfo'
 * @param fetch - The fetch implementation to use.
 */
export function createJsonRpcClient(host, stringClassMap, objectClassMap, useApiEndpoints, namespaceMethods, fetch = defaultFetch) {
    const classConverter = new ClassConverter(stringClassMap, objectClassMap);
    let id = 0;
    const request = async (method, params) => {
        const body = {
            jsonrpc: '2.0',
            id: id++,
            method,
            params: params.map(param => convertToJsonObj(classConverter, param)),
        };
        // console.log('body: ', body);
        log.debug(format(`JsonRpcClient.request`, method, '<-', params));
        const res = await fetch(host, method, body, useApiEndpoints);
        // console.log('response: ', res);
        log.debug(format(`JsonRpcClient.result`, method, '->', res));
        if (res.error) {
            throw res.error;
        }
        // console.log('6');
        if ([null, undefined, 'null', 'undefined'].includes(res.result)) {
            return;
        }
        // console.log('convertFromJsonObj...');
        return convertFromJsonObj(classConverter, res.result);
    };
    // Intercept any RPC methods with a proxy
    // This wraps 'request' with a method-call syntax wrapper
    return new Proxy({}, {
        get: (target, method) => {
            // console.log('get called');
            if (typeof method === 'symbol') {
                // console.log("method == 'symbol");
                return Reflect.get(target, method); // Handle symbols safely
            }
            // console.log('4');
            let rpcMethod = method;
            if (namespaceMethods) {
                rpcMethod = `${namespaceMethods}_${method}`;
            }
            if (['then', 'catch'].includes(method)) {
                return Reflect.get(target, method);
            }
            //  console.log('5');
            return (...params) => {
                log.debug(format(`JsonRpcClient.constructor`, 'proxy', rpcMethod, '<-', params));
                return request(rpcMethod, params);
            };
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9ycGNfY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2pzb24tcnBjL2NsaWVudC9qc29uX3JwY19jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU5QixPQUFPLEVBQW9CLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBZ0UsTUFBTSx1QkFBdUIsQ0FBQztBQUNySCxPQUFPLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUMxRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FDaEMsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLElBQVMsRUFDVCxlQUF3QixFQUN4QixPQUFPLEdBQUcsS0FBSztJQUVmLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEUsSUFBSSxJQUFjLENBQUM7SUFDbkIsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNwQixJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDekMsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN6QixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JB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