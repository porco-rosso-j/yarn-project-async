import { pedersenHash } from '@aztec/foundation/crypto';
import { Fr } from '@aztec/foundation/fields';
import { FUNCTION_TREE_HEIGHT, GeneratorIndex } from '../constants.gen.js';
import { MerkleTreeCalculator } from '../merkle/index.js';
// Memoize the merkle tree calculators to avoid re-computing the zero-hash for each level in each call
let privateFunctionTreeCalculator;
const PRIVATE_FUNCTION_SIZE = 2;
/** Returns a Merkle tree for the set of private functions in a contract. */
export async function computePrivateFunctionsTree(fns) {
    return (await getPrivateFunctionTreeCalculator()).computeTree(await computePrivateFunctionLeaves(fns));
}
/** Returns the Merkle tree root for the set of private functions in a contract. */
export async function computePrivateFunctionsRoot(fns) {
    return Fr.fromBuffer((await getPrivateFunctionTreeCalculator()).computeTreeRoot(await computePrivateFunctionLeaves(fns)));
}
async function computePrivateFunctionLeaves(fns) {
    const leaves = [...fns].sort((a, b) => a.selector.value - b.selector.value);
    return await Promise.all(leaves.map(computePrivateFunctionLeaf));
}
/** Returns the leaf for a given private function. */
export async function computePrivateFunctionLeaf(fn) {
    return (await pedersenHash([fn.selector, fn.vkHash], GeneratorIndex.FUNCTION_LEAF)).toBuffer();
}
async function getPrivateFunctionTreeCalculator() {
    if (!privateFunctionTreeCalculator) {
        const functionTreeZeroLeaf = (await pedersenHash(new Array(PRIVATE_FUNCTION_SIZE).fill(0))).toBuffer();
        privateFunctionTreeCalculator = new MerkleTreeCalculator(FUNCTION_TREE_HEIGHT, functionTreeZeroLeaf);
    }
    return privateFunctionTreeCalculator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9wcml2YXRlX2Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNFLE9BQU8sRUFBbUIsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUzRSxzR0FBc0c7QUFDdEcsSUFBSSw2QkFBK0QsQ0FBQztBQUVwRSxNQUFNLHFCQUFxQixHQUFHLENBQUMsQ0FBQztBQUVoQyw0RUFBNEU7QUFDNUUsTUFBTSxDQUFDLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxHQUFzQjtJQUN0RSxPQUFPLENBQUMsTUFBTSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RyxDQUFDO0FBRUQsbUZBQW1GO0FBQ25GLE1BQU0sQ0FBQyxLQUFLLFVBQVUsMkJBQTJCLENBQUMsR0FBc0I7SUFDdEUsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVILENBQUM7QUFFRCxLQUFLLFVBQVUsNEJBQTRCLENBQUMsR0FBc0I7SUFDaEUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELHFEQUFxRDtBQUNyRCxNQUFNLENBQUMsS0FBSyxVQUFVLDBCQUEwQixDQUFDLEVBQW1CO0lBQ2xFLE9BQVEsQ0FBQyxNQUFNLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xHLENBQUM7QUFFRCxLQUFLLFVBQVUsZ0NBQWdDO0lBQzdDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ25DLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLFlBQVksQ0FBQyxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkcsNkJBQTZCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFDRCxPQUFPLDZCQUE2QixDQUFDO0FBQ3ZDLENBQUMifQ==