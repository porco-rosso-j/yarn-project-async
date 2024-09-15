import { EcdsaSignature } from './signature.js';
EcdsaSignature;
// import { NativeModules } from 'react-native';
// const { BBSwiftModule } = {NativeModules};
export * from './signature.js';
// eslint-disable-next-line require-await
async function emptyAsyncMethod() {
    return Promise.resolve('This is the returned value.');
}
/**
 * ECDSA signature construction and helper operations.
 * TODO: Replace with codegen api on bb.js.
 */
export class Ecdsa {
    /**
     * Computes a secp256k1 public key from a private key.
     * @param privateKey - Secp256k1 private key.
     * @returns A secp256k1 public key.
     */
    async computePublicKey(privateKey) {
        // return await BBSwiftModule.method(privateKey)
        //   .then((resultBuffer: any) => {
        //     if (!resultBuffer) {
        //       throw new Error('computePublicKey returned null or encountered an error');
        //     }
        //     return resultBuffer;
        //   })
        //   .catch((error: any) => {});
        privateKey;
        return await emptyAsyncMethod();
    }
    /**
     * Constructs an ECDSA signature given a msg and a private key.
     * @param msg - Message over which the signature is constructed.
     * @param privateKey - The secp256k1 private key of the signer.
     * @returns An ECDSA signature of the form (r, s, v).
     */
    async constructSignature(msg, privateKey) {
        // return BBSwiftModule.ecdsaConstructSignature(privateKey)
        //   .then((resultBuffer: any) => {
        //     console.log('Result:', resultBuffer);
        //     if (!resultBuffer) {
        //       throw new Error('constructSignature returned null or encountered an error');
        //     }
        //     return new EcdsaSignature(
        //       Buffer.from(resultBuffer.slice(0, 32)),
        //       Buffer.from(resultBuffer.slice(32, 64)),
        //       Buffer.from(resultBuffer.slice(64, 65)),
        //     );
        //   })
        //   .catch((error: any) => {
        //     console.error('Error:', error);
        //   });
        return Promise.resolve(new EcdsaSignature(Buffer.from(msg), Buffer.from(msg), Buffer.from(msg)));
    }
    /**
     * Recovers a secp256k1 public key from an ECDSA signature (similar to ecrecover).
     * @param msg - Message over which the signature was constructed.
     * @param sig - The ECDSA signature.
     * @returns The secp256k1 public key of the signer.
     */
    async recoverPublicKey(msg, sig) {
        // return BBSwiftModule.ecdsaRecoverPublicKey(msg, sig.r, sig.s, sig.v)
        //   .then((resultBuffer: any) => {
        //     console.log('Result:', resultBuffer);
        //     if (!resultBuffer) {
        //       throw new Error('recoverPublicKey returned null or encountered an error');
        //     }
        //     return Buffer.from(resultBuffer);
        //   })
        //   .catch((error: any) => {
        //     console.error('Error:', error);
        //   });
        return Promise.resolve(Buffer.from(msg));
    }
    /**
     * Verifies and ECDSA signature given a secp256k1 public key.
     * @param msg - Message over which the signature was constructed.
     * @param pubKey - The secp256k1 public key of the signer.
     * @param sig - The ECDSA signature.
     * @returns True or false.
     */
    async verifySignature(msg, pubKey, sig) {
        // return BBSwiftModule.ecdsaVerifySignature(msg, pubKey, sig.r, sig.s, sig.v)
        //   .then((resultBuffer: any) => {
        //     console.log('Result:', resultBuffer);
        //     if (!resultBuffer) {
        //       throw new Error('verifySignature returned null or encountered an error');
        //     }
        //     return Buffer.from(resultBuffer);
        //   })
        //   .catch((error: any) => {
        //     console.error('Error:', error);
        //   });
        return Promise.resolve(pubKey);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnL2NyeXB0by9lY2RzYS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsY0FBYyxDQUFDO0FBQ2YsZ0RBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxjQUFjLGdCQUFnQixDQUFDO0FBRS9CLHlDQUF5QztBQUN6QyxLQUFLLFVBQVUsZ0JBQWdCO0lBQzdCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFDRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sS0FBSztJQUNoQjs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQWtCO1FBQzlDLGdEQUFnRDtRQUNoRCxtQ0FBbUM7UUFDbkMsMkJBQTJCO1FBQzNCLG1GQUFtRjtRQUNuRixRQUFRO1FBQ1IsMkJBQTJCO1FBQzNCLE9BQU87UUFDUCxnQ0FBZ0M7UUFDaEMsVUFBVSxDQUFDO1FBQ1gsT0FBTyxNQUFNLGdCQUFnQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQWUsRUFBRSxVQUFrQjtRQUNqRSwyREFBMkQ7UUFDM0QsbUNBQW1DO1FBQ25DLDRDQUE0QztRQUM1QywyQkFBMkI7UUFDM0IscUZBQXFGO1FBQ3JGLFFBQVE7UUFDUixpQ0FBaUM7UUFDakMsZ0RBQWdEO1FBQ2hELGlEQUFpRDtRQUNqRCxpREFBaUQ7UUFDakQsU0FBUztRQUNULE9BQU87UUFDUCw2QkFBNkI7UUFDN0Isc0NBQXNDO1FBQ3RDLFFBQVE7UUFDUixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFlLEVBQUUsR0FBbUI7UUFDaEUsdUVBQXVFO1FBQ3ZFLG1DQUFtQztRQUNuQyw0Q0FBNEM7UUFDNUMsMkJBQTJCO1FBQzNCLG1GQUFtRjtRQUNuRixRQUFRO1FBQ1Isd0NBQXdDO1FBQ3hDLE9BQU87UUFDUCw2QkFBNkI7UUFDN0Isc0NBQXNDO1FBQ3RDLFFBQVE7UUFDUixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQWUsRUFBRSxNQUFjLEVBQUUsR0FBbUI7UUFDL0UsOEVBQThFO1FBQzlFLG1DQUFtQztRQUNuQyw0Q0FBNEM7UUFDNUMsMkJBQTJCO1FBQzNCLGtGQUFrRjtRQUNsRixRQUFRO1FBQ1Isd0NBQXdDO1FBQ3hDLE9BQU87UUFDUCw2QkFBNkI7UUFDN0Isc0NBQXNDO1FBQ3RDLFFBQVE7UUFDUixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGIn0=