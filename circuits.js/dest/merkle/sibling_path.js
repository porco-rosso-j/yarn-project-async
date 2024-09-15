/** Computes the expected root of a merkle tree given a leaf and its sibling path. */
// TODO_ASYNC: can't use await as hasher defined in MerkleTreeCalculator's constructor can't use await.
export async function computeRootFromSiblingPath(leaf, siblingPath, index, 
// hasher = async (left: Buffer, right: Buffer) => (await pedersenHash([left, right])).toBuffer(),
hasher = (left, right) => Buffer.alloc(32)) {
    let result = leaf;
    for (const sibling of siblingPath) {
        result = index & 1 ? hasher(sibling, result) : hasher(result, sibling);
        index >>= 1;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2libGluZ19wYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lcmtsZS9zaWJsaW5nX3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEscUZBQXFGO0FBQ3JGLHVHQUF1RztBQUN2RyxNQUFNLENBQUMsS0FBSyxVQUFVLDBCQUEwQixDQUM5QyxJQUFZLEVBQ1osV0FBcUIsRUFDckIsS0FBYTtBQUNiLGtHQUFrRztBQUNsRyxTQUFTLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFFMUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLEtBQUssTUFBTSxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbEMsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkUsS0FBSyxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=