import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader, numToUInt8, serializeToBuffer } from '@aztec/foundation/serialize';
const VERSION = 1;
export class SerializableContractInstance {
    constructor(instance) {
        this.version = VERSION;
        if (instance.version !== VERSION) {
            throw new Error(`Unexpected contract class version ${instance.version}`);
        }
        this.salt = instance.salt;
        this.deployer = instance.deployer;
        this.contractClassId = instance.contractClassId;
        this.initializationHash = instance.initializationHash;
        this.publicKeysHash = instance.publicKeysHash;
    }
    toBuffer() {
        return serializeToBuffer(numToUInt8(this.version), this.salt, this.deployer, this.contractClassId, this.initializationHash, this.publicKeysHash);
    }
    /** Returns a copy of this object with its address included. */
    withAddress(address) {
        return { ...this, address };
    }
    static fromBuffer(bufferOrReader) {
        const reader = BufferReader.asReader(bufferOrReader);
        return new SerializableContractInstance({
            version: reader.readUInt8(),
            salt: reader.readObject(Fr),
            deployer: reader.readObject(AztecAddress),
            contractClassId: reader.readObject(Fr),
            initializationHash: reader.readObject(Fr),
            publicKeysHash: reader.readObject(Fr),
        });
    }
    static random(opts = {}) {
        return new SerializableContractInstance({
            version: VERSION,
            salt: Fr.random(),
            deployer: AztecAddress.random(),
            contractClassId: Fr.random(),
            initializationHash: Fr.random(),
            publicKeysHash: Fr.random(),
            ...opts,
        });
    }
    static empty() {
        return new SerializableContractInstance({
            version: VERSION,
            salt: Fr.zero(),
            deployer: AztecAddress.zero(),
            contractClassId: Fr.zero(),
            initializationHash: Fr.zero(),
            publicKeysHash: Fr.zero(),
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RfaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3RzL2NvbnRyYWN0X2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUcxRixNQUFNLE9BQU8sR0FBRyxDQUFVLENBQUM7QUFvQjNCLE1BQU0sT0FBTyw0QkFBNEI7SUFRdkMsWUFBWSxRQUEwQjtRQVB0QixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBUWhDLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLGlCQUFpQixDQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUN4QixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxDQUFDLGtCQUFrQixFQUN2QixJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVELCtEQUErRDtJQUMvRCxXQUFXLENBQUMsT0FBcUI7UUFDL0IsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQXFDO1FBQ3JELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLDRCQUE0QixDQUFDO1lBQ3RDLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFvQjtZQUM3QyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ3pDLGVBQWUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN6QyxjQUFjLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBNEMsRUFBRTtRQUMxRCxPQUFPLElBQUksNEJBQTRCLENBQUM7WUFDdEMsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDakIsUUFBUSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsZUFBZSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDNUIsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUMvQixjQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUMzQixHQUFHLElBQUk7U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksNEJBQTRCLENBQUM7WUFDdEMsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDZixRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRTtZQUM3QixlQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRTtZQUMxQixrQkFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQzdCLGNBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiJ9