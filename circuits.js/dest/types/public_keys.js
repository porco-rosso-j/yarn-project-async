import { poseidon2Hash } from '@aztec/foundation/crypto';
import { Fr, Point } from '@aztec/foundation/fields';
import { BufferReader, FieldReader, serializeToBuffer } from '@aztec/foundation/serialize';
import { GeneratorIndex } from '../constants.gen.js';
export class PublicKeys {
    constructor(
    /** Contract address (typically of an account contract) */
    /** Master nullifier public key */
    masterNullifierPublicKey, 
    /** Master incoming viewing public key */
    masterIncomingViewingPublicKey, 
    /** Master outgoing viewing public key */
    masterOutgoingViewingPublicKey, 
    /** Master tagging viewing public key */
    masterTaggingPublicKey) {
        this.masterNullifierPublicKey = masterNullifierPublicKey;
        this.masterIncomingViewingPublicKey = masterIncomingViewingPublicKey;
        this.masterOutgoingViewingPublicKey = masterOutgoingViewingPublicKey;
        this.masterTaggingPublicKey = masterTaggingPublicKey;
    }
    hash() {
        return this.isEmpty()
            ? Fr.ZERO
            : poseidon2Hash([
                this.masterNullifierPublicKey,
                this.masterIncomingViewingPublicKey,
                this.masterOutgoingViewingPublicKey,
                this.masterTaggingPublicKey,
                GeneratorIndex.PUBLIC_KEYS_HASH,
            ]);
    }
    isEmpty() {
        return (this.masterNullifierPublicKey.isZero() &&
            this.masterIncomingViewingPublicKey.isZero() &&
            this.masterOutgoingViewingPublicKey.isZero() &&
            this.masterTaggingPublicKey.isZero());
    }
    static empty() {
        return new PublicKeys(Point.ZERO, Point.ZERO, Point.ZERO, Point.ZERO);
    }
    /**
     * Determines if this PublicKeys instance is equal to the given PublicKeys instance.
     * Equality is based on the content of their respective buffers.
     *
     * @param other - The PublicKeys instance to compare against.
     * @returns True if the buffers of both instances are equal, false otherwise.
     */
    equals(other) {
        return (this.masterNullifierPublicKey.equals(other.masterNullifierPublicKey) &&
            this.masterIncomingViewingPublicKey.equals(other.masterIncomingViewingPublicKey) &&
            this.masterOutgoingViewingPublicKey.equals(other.masterOutgoingViewingPublicKey) &&
            this.masterTaggingPublicKey.equals(other.masterTaggingPublicKey));
    }
    /**
     * Converts the PublicKeys instance into a Buffer.
     * This method should be used when encoding the address for storage, transmission or serialization purposes.
     *
     * @returns A Buffer representation of the PublicKeys instance.
     */
    toBuffer() {
        return serializeToBuffer([
            this.masterNullifierPublicKey,
            this.masterIncomingViewingPublicKey,
            this.masterOutgoingViewingPublicKey,
            this.masterTaggingPublicKey,
        ]);
    }
    /**
     * Creates an PublicKeys instance from a given buffer or BufferReader.
     * If the input is a Buffer, it wraps it in a BufferReader before processing.
     * Throws an error if the input length is not equal to the expected size.
     *
     * @param buffer - The input buffer or BufferReader containing the address data.
     * @returns - A new PublicKeys instance with the extracted address data.
     */
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        const masterNullifierPublicKey = reader.readObject(Point);
        const masterIncomingViewingPublicKey = reader.readObject(Point);
        const masterOutgoingViewingPublicKey = reader.readObject(Point);
        const masterTaggingPublicKey = reader.readObject(Point);
        return new PublicKeys(masterNullifierPublicKey, masterIncomingViewingPublicKey, masterOutgoingViewingPublicKey, masterTaggingPublicKey);
    }
    toNoirStruct() {
        // We need to use lowercase identifiers as those are what the noir interface expects
        // eslint-disable-next-line camelcase
        return {
            // TODO(#6337): Directly dump account.publicKeys here
            /* eslint-disable camelcase */
            npk_m: this.masterNullifierPublicKey.toNoirStruct(),
            ivpk_m: this.masterIncomingViewingPublicKey.toNoirStruct(),
            ovpk_m: this.masterOutgoingViewingPublicKey.toNoirStruct(),
            tpk_m: this.masterTaggingPublicKey.toNoirStruct(),
            /* eslint-enable camelcase */
        };
    }
    /**
     * Serializes the payload to an array of fields
     * @returns The fields of the payload
     */
    toFields() {
        return [
            ...this.masterNullifierPublicKey.toFields(),
            ...this.masterIncomingViewingPublicKey.toFields(),
            ...this.masterOutgoingViewingPublicKey.toFields(),
            ...this.masterTaggingPublicKey.toFields(),
        ];
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return new PublicKeys(reader.readObject(Point), reader.readObject(Point), reader.readObject(Point), reader.readObject(Point));
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
    static fromString(keys) {
        return PublicKeys.fromBuffer(Buffer.from(keys, 'hex'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tleXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvcHVibGljX2tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckQsTUFBTSxPQUFPLFVBQVU7SUFDckI7SUFDRSwwREFBMEQ7SUFDMUQsa0NBQWtDO0lBQzNCLHdCQUFtQztJQUMxQyx5Q0FBeUM7SUFDbEMsOEJBQXlDO0lBQ2hELHlDQUF5QztJQUNsQyw4QkFBeUM7SUFDaEQsd0NBQXdDO0lBQ2pDLHNCQUFpQztRQU5qQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVc7UUFFbkMsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFXO1FBRXpDLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBVztRQUV6QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVc7SUFDdkMsQ0FBQztJQUVKLElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJO1lBQ1QsQ0FBQyxDQUFDLGFBQWEsQ0FBQztnQkFDWixJQUFJLENBQUMsd0JBQXdCO2dCQUM3QixJQUFJLENBQUMsOEJBQThCO2dCQUNuQyxJQUFJLENBQUMsOEJBQThCO2dCQUNuQyxJQUFJLENBQUMsc0JBQXNCO2dCQUMzQixjQUFjLENBQUMsZ0JBQWdCO2FBQ2hDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxDQUNMLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE1BQU0sRUFBRTtZQUM1QyxJQUFJLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FDckMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSztRQUNWLE9BQU8sSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsS0FBaUI7UUFDdEIsT0FBTyxDQUNMLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDO1lBQ3BFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDO1lBQ2hGLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDO1lBQ2hGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQ2pFLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQztZQUN2QixJQUFJLENBQUMsd0JBQXdCO1lBQzdCLElBQUksQ0FBQyw4QkFBOEI7WUFDbkMsSUFBSSxDQUFDLDhCQUE4QjtZQUNuQyxJQUFJLENBQUMsc0JBQXNCO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxNQUFNLDhCQUE4QixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsTUFBTSw4QkFBOEIsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksVUFBVSxDQUNuQix3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5QixzQkFBc0IsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZO1FBQ1Ysb0ZBQW9GO1FBQ3BGLHFDQUFxQztRQUNyQyxPQUFPO1lBQ0wscURBQXFEO1lBQ3JELDhCQUE4QjtZQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRTtZQUNuRCxNQUFNLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksRUFBRTtZQUMxRCxNQUFNLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFlBQVksRUFBRTtZQUMxRCxLQUFLLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRTtZQUNqRCw2QkFBNkI7U0FDOUIsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ04sT0FBTztZQUNMLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRTtZQUMzQyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUU7WUFDakQsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFFO1lBQ2pELEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRTtTQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBMEI7UUFDMUMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksVUFBVSxDQUNuQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUN6QixDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBWTtRQUM1QixPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0YifQ==