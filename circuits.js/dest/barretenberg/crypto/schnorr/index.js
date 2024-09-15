// TODO: eliminate foudnation dep and make PublicKey any?
export * from './signature.js';
/**
 * Schnorr signature construction and helper operations.
 */
export class Schnorr {
    /**
     * Computes a grumpkin public key from a private key.
     * @param privateKey - The private key.
     * @returns A grumpkin public key.
     */
    computePublicKey(privateKey) {
        console.log('computePublicKey not supported');
        return {
            x: privateKey.toBuffer(),
            y: privateKey.toBuffer(),
        };
    }
    /**
     * Constructs a Schnorr signature given a msg and a private key.
     * @param msg - Message over which the signature is constructed.
     * @param privateKey - The private key of the signer.
     * @returns A Schnorr signature of the form (s, e).
     */
    constructSignature(msg, privateKey) {
        console.log('constructSignature not supported');
        return privateKey;
    }
    /**
     * Verifies a Schnorr signature given a Grumpkin public key.
     * @param msg - Message over which the signature was constructed.
     * @param pubKey - The Grumpkin public key of the signer.
     * @param sig - The Schnorr signature.
     * @returns True or false.
     */
    verifySignature(msg, pubKey, sig) {
        console.log('constructSignature not supported');
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NyeXB0by9zY2hub3JyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLHlEQUF5RDtBQUV6RCxjQUFjLGdCQUFnQixDQUFDO0FBRS9COztHQUVHO0FBQ0gsTUFBTSxPQUFPLE9BQU87SUFDbEI7Ozs7T0FJRztJQUNJLGdCQUFnQixDQUFDLFVBQTBCO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5QyxPQUFPO1lBQ0wsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7U0FDekIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLGtCQUFrQixDQUFDLEdBQWUsRUFBRSxVQUEwQjtRQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGVBQWUsQ0FBQyxHQUFlLEVBQUUsTUFBVyxFQUFFLEdBQXFCO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNoRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiJ9