/** Computes the expected root of a merkle tree given a leaf and its sibling path. */
export declare function computeRootFromSiblingPath(leaf: Buffer, siblingPath: Buffer[], index: number, hasher?: (left: Buffer, right: Buffer) => Promise<Buffer>): Promise<Buffer>;
//# sourceMappingURL=sibling_path.d.ts.map