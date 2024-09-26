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
    async hash() {
        return this.isEmpty()
            ? Fr.ZERO
            : await poseidon2Hash([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2tleXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvcHVibGljX2tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHckQsTUFBTSxPQUFPLFVBQVU7SUFDckI7SUFDRSwwREFBMEQ7SUFDMUQsa0NBQWtDO0lBQzNCLHdCQUFtQztJQUMxQyx5Q0FBeUM7SUFDbEMsOEJBQXlDO0lBQ2hELHlDQUF5QztJQUNsQyw4QkFBeUM7SUFDaEQsd0NBQXdDO0lBQ2pDLHNCQUFpQztRQU5qQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVc7UUFFbkMsbUNBQThCLEdBQTlCLDhCQUE4QixDQUFXO1FBRXpDLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBVztRQUV6QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVc7SUFDdkMsQ0FBQztJQUVKLEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ25CLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSTtZQUNULENBQUMsQ0FBQyxNQUFNLGFBQWEsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLHdCQUF3QjtnQkFDN0IsSUFBSSxDQUFDLDhCQUE4QjtnQkFDbkMsSUFBSSxDQUFDLDhCQUE4QjtnQkFDbkMsSUFBSSxDQUFDLHNCQUFzQjtnQkFDM0IsY0FBYyxDQUFDLGdCQUFnQjthQUNoQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sQ0FDTCxJQUFJLENBQUMsd0JBQXdC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