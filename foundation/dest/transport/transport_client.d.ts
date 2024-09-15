import EventEmitter from 'events';
import { type Connector } from './interface/connector.js';
/**
 * Represents a transport client for communication between TransportServer and clients.
 * Provides request/response functionality, event handling, and multiplexing support
 * for efficient and concurrent communication with a corresponding TransportServer.
 */
export interface ITransportClient<Payload> extends EventEmitter {
    on(name: 'event_msg', handler: (payload: Payload) => void): this;
    emit(name: 'event_msg', payload: Payload): boolean;
}
/**
 * A TransportClient provides a request/response and event api to a corresponding TransportServer.
 * If `broadcast` is called on TransportServer, TransportClients will emit an `event_msg`.
 * The `request` method will block until a response is returned from the TransportServer's dispatch function.
 * Request multiplexing is supported.
 */
export declare class TransportClient<Payload> extends EventEmitter {
    private transportConnect;
    private msgId;
    private pendingRequests;
    private socket?;
    constructor(transportConnect: Connector);
    /**
     * Initializes and opens the socket connection for the TransportClient.
     * This method creates a new Socket instance using the provided Connector,
     * registers a handler for incoming messages, and establishes the connection.
     * It should be called before making any requests or handling events.
     *
     * @throws An error if the socket is already open or there's an issue opening the connection.
     * @returns A Promise that resolves when the socket connection is successfully opened.
     */
    open(): Promise<void>;
    /**
     * Close the transport client's socket connection and remove all event listeners.
     * This method should be called when the client is no longer needed to ensure proper cleanup
     * and prevent potential memory leaks. Once closed, the client cannot be reused and a new
     * instance must be created if another connection is needed.
     */
    close(): void;
    /**
     * Sends a request to the TransportServer with the given payload and transferable objects.
     * The method will block until a response from the TransportServer's dispatch function is returned.
     * Request multiplexing is supported, allowing multiple requests to be sent concurrently.
     *
     * @param payload - The message payload to send to the server.
     * @param transfer - An optional array of ArrayBuffer, MessagePort, or ImageBitmap objects to transfer ownership.
     * @returns A Promise that resolves with the server's response data or rejects with an error message.
     */
    request(payload: Payload, transfer?: Transferable[]): Promise<any>;
    /**
     * Handles incoming socket messages from the TransportServer, such as ResponseMessage and EventMessage.
     * If it's an EventMessage, emits an 'event_msg' event with the payload.
     * If it's a ResponseMessage, resolves or rejects the corresponding pending request based on the message content.
     *
     * @param msg - The ResponseMessage or EventMessage received from the TransportServer, or undefined if the remote socket closed.
     */
    private handleSocketMessage;
}
//# sourceMappingURL=transport_client.d.ts.map