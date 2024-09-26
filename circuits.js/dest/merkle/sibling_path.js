import { pedersenHash } from '@aztec/foundation/crypto';
/** Computes the expected root of a merkle tree given a leaf and its sibling path. */
export async function computeRootFromSiblingPath(leaf, siblingPath, index, hasher = async (left, right) => {
    return (await pedersenHash([left, right])).toBuffer();
}) {
    let result = leaf;
    for (const sibling of siblingPath) {
        result = index & 1 ? await hasher(sibling, result) : await hasher(result, sibling);
        index >>= 1;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2libGluZ19wYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lcmtsZS9zaWJsaW5nX3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhELHFGQUFxRjtBQUNyRixNQUFNLENBQUMsS0FBSyxVQUFVLDBCQUEwQixDQUM5QyxJQUFZLEVBQ1osV0FBcUIsRUFDckIsS0FBYSxFQUNiLFNBQTJELEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0UsT0FBTyxDQUFDLE1BQU0sWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLEtBQUssTUFBTSxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbEMsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25GLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9