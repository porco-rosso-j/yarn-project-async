import { Grumpkin } from '@aztec/circuits.js/barretenberg';
/**
 * Method for generating a public grumpkin key from a private key.
 * @param privateKey - The private key.
 * @returns The generated public key.
 */
export async function generatePublicKey(privateKey) {
    const grumpkin = new Grumpkin();
    return await grumpkin.mul(grumpkin.generator(), privateKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHViX2tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9wdWJfa2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUzRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxVQUEwQjtJQUNoRSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLE9BQU8sTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=