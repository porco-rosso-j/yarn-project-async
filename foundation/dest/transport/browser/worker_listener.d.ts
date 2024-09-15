import EventEmitter from 'events';
import { type Listener } from '../interface/listener.js';
/**
 * Represents a DedicatedWorkerGlobalScope, which is the global execution context for a dedicated worker.
 * Provides properties and methods to manage the worker's lifecycle and communication with other threads or workers.
 */
declare interface DedicatedWorkerGlobalScope {
    /**
     * Handler for incoming messages from other threads or workers.
     */
    onmessage: any;
}
/**
 * WorkerListener is a class that extends EventEmitter and implements the Listener interface.
 * It listens for incoming connections on a dedicated worker global scope, and emits a 'new_socket' event
 * with a MessagePortSocket instance for each new connection. This allows applications to communicate
 * with other workers or main thread through the MessagePortSocket abstraction.
 *
 * The open() method starts listening for incoming connections, while the close() method stops it.
 */
export declare class WorkerListener extends EventEmitter implements Listener {
    private worker;
    constructor(worker: DedicatedWorkerGlobalScope);
    /**
     * Initializes the WorkerListener by setting the 'onmessage' event handler of the worker.
     * The 'onmessage' event will be triggered when the worker receives a message, and it will then
     * call the handleMessageEvent method to handle incoming connections.
     */
    open(): void;
    /**
     * Close the worker listener by removing the 'onmessage' event handler.
     * This method effectively stops the WorkerListener from reacting to new incoming messages.
     */
    close(): void;
    private handleMessageEvent;
}
export {};
//# sourceMappingURL=worker_listener.d.ts.map