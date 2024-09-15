import { type DataStore } from '../data_store.js';
/**
 * Cache for data used by wasm module.
 */
export declare class NodeDataStore implements DataStore {
    private db;
    constructor(path?: string);
    get(key: string): Promise<Buffer | undefined>;
    set(key: string, value: Buffer): Promise<void>;
}
//# sourceMappingURL=node_data_store.d.ts.map