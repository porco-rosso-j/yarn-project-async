import { inspect } from 'util';
import { Fr, fromBuffer } from '../fields/index.js';
import { FieldReader } from '../serialize/index.js';
import { TypeRegistry } from '../serialize/type_registry.js';
/**
 * AztecAddress represents a 32-byte address in the Aztec Protocol.
 * It provides methods to create, manipulate, and compare addresses.
 * The maximum value of an address is determined by the field modulus and all instances of AztecAddress.
 * It should have a value less than or equal to this max value.
 * This class also provides helper functions to convert addresses from strings, buffers, and other formats.
 */
export class AztecAddress extends Fr {
    constructor(buffer) {
        if (buffer.length !== 32) {
            throw new Error(`Invalid AztecAddress length ${buffer.length}.`);
        }
        super(buffer);
    }
    // [inspect.custom]() {
    [inspect.custom]() {
        return `AztecAddress<${this.toString()}>`;
    }
    static zero() {
        return AztecAddress.ZERO;
    }
    static fromBuffer(buffer) {
        return fromBuffer(buffer, AztecAddress);
    }
    static fromField(fr) {
        return new AztecAddress(fr.toBuffer());
    }
    static fromFields(fields) {
        const reader = FieldReader.asReader(fields);
        return AztecAddress.fromField(reader.readField());
    }
    static fromBigInt(value) {
        return AztecAddress.fromField(new Fr(value));
    }
    static fromString(buf) {
        const buffer = Buffer.from(buf.replace(/^0x/i, ''), 'hex');
        return new AztecAddress(buffer);
    }
    static random() {
        return new AztecAddress(super.random().toBuffer());
    }
    toJSON() {
        return {
            type: 'AztecAddress',
            value: this.toString(),
        };
    }
}
AztecAddress.ZERO = new AztecAddress(Buffer.alloc(32));
// For deserializing JSON.
TypeRegistry.register('AztecAddress', AztecAddress);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXp0ZWMtYWRkcmVzcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFxQixXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFN0Q7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFPLFlBQWEsU0FBUSxFQUFFO0lBQ2xDLFlBQVksTUFBYztRQUN4QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsdUJBQXVCO0lBQ2QsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLE9BQU8sZ0JBQWdCLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFJRCxNQUFNLENBQVUsSUFBSTtRQUNsQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBVSxVQUFVLENBQUMsTUFBNkI7UUFDdEQsT0FBTyxVQUFVLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQU07UUFDckIsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUEwQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFhO1FBQzdCLE9BQU8sWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNLENBQVUsVUFBVSxDQUFDLEdBQVc7UUFDcEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxNQUFNLENBQVUsTUFBTTtRQUNwQixPQUFPLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFUSxNQUFNO1FBQ2IsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ3ZCLENBQUM7SUFDSixDQUFDOztBQXJDZSxpQkFBSSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQXdDNUQsMEJBQTBCO0FBQzFCLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDIn0=