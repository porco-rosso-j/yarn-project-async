/** A simple immutable Merkle tree container. Use a MerkleTreeCalculator to create a new instance from a set of leaves. */
export class MerkleTree {
    constructor(height, nodes) {
        this.height = height;
        this.nodes = nodes;
        const expectedNodeCount = 2 ** (height + 1) - 1;
        if (nodes.length !== expectedNodeCount) {
            throw new Error(`Invalid node count for Merkle tree: got ${nodes.length} but expected ${expectedNodeCount}`);
        }
    }
    get root() {
        return this.nodes[this.nodes.length - 1];
    }
    get leaves() {
        return this.nodes.slice(0, 2 ** this.height);
    }
    getSiblingPath(leafIndexOrLeaf) {
        if (Buffer.isBuffer(leafIndexOrLeaf)) {
            return this.getSiblingPath(this.getIndex(leafIndexOrLeaf));
        }
        const leafIndex = leafIndexOrLeaf;
        if (leafIndex < 0 || leafIndex >= 2 ** this.height) {
            throw new Error(`Invalid leaf index: got ${leafIndex} but leaves count is ${2 ** this.height}`);
        }
        const tree = this.nodes;
        let rowSize = Math.ceil(tree.length / 2);
        let rowOffset = 0;
        let index = leafIndex;
        const siblingPath = [];
        while (rowSize > 1) {
            const isRight = index & 1;
            siblingPath.push(tree[rowOffset + index + (isRight ? -1 : 1)]);
            rowOffset += rowSize;
            rowSize >>= 1;
            index >>= 1;
        }
        return siblingPath;
    }
    /** Returns the leaf index for a given element. */
    getIndex(element) {
        return this.leaves.findIndex(leaf => leaf.equals(element));
    }
    /** Returns a nice string representation of the tree, useful for debugging purposes. */
    drawTree() {
        const levels = [];
        const tree = this.nodes;
        const maxRowSize = Math.ceil(tree.length / 2);
        let paddingSize = 1;
        let rowSize = maxRowSize;
        let rowOffset = 0;
        while (rowSize > 0) {
            levels.push(tree
                .slice(rowOffset, rowOffset + rowSize)
                .map(n => n.toString('hex').slice(0, 8) + ' '.repeat((paddingSize - 1) * 9)));
            rowOffset += rowSize;
            paddingSize <<= 1;
            rowSize >>= 1;
        }
        return levels
            .reverse()
            .map(row => row.join(' '))
            .join('\n');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVya2xlL21lcmtsZV90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBIQUEwSDtBQUMxSCxNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUE0QixNQUFjLEVBQWtCLEtBQWU7UUFBL0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFrQixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxLQUFLLENBQUMsTUFBTSxpQkFBaUIsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQy9HLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFLTSxjQUFjLENBQUMsZUFBZ0M7UUFDcEQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQ0QsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJ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