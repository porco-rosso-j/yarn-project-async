import { GrumpkinScalar } from '@aztec/foundation/fields';
import { BufferReader, serializeToBuffer } from '@aztec/foundation/serialize';
export class KeyValidationHint {
    constructor(
    /** Master secret key used to derive sk_app and pk_m. */
    skM, 
    /** Index of the request in the array of hints. */
    requestIndex) {
        this.skM = skM;
        this.requestIndex = requestIndex;
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new KeyValidationHint(reader.readObject(GrumpkinScalar), reader.readNumber());
    }
    toBuffer() {
        return serializeToBuffer(this.skM, this.requestIndex);
    }
    static empty() {
        return new KeyValidationHint(GrumpkinScalar.zero(), 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X3ZhbGlkYXRpb25faGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdHJ1Y3RzL3JlYWRfcmVxdWVzdF9oaW50cy9rZXlfdmFsaWRhdGlvbl9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QjtJQUNFLHdEQUF3RDtJQUNqRCxHQUFtQjtJQUMxQixrREFBa0Q7SUFDM0MsWUFBb0I7UUFGcEIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFFbkIsaUJBQVksR0FBWixZQUFZLENBQVE7SUFDMUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxJQUFJLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0YifQ==