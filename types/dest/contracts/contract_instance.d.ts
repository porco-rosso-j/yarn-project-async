import { AztecAddress } from '@aztec/foundation/aztec-address';
import { Fr } from '@aztec/foundation/fields';
import { BufferReader } from '@aztec/foundation/serialize';
import { type FieldsOf } from '@aztec/foundation/types';
declare const VERSION: 1;
/** A contract instance is a concrete deployment of a contract class. A contract instance always references a contract class, which dictates what code it executes when called. A contract instance has state (both private and public), as well as an address that acts as its identifier. A contract instance can be called into. */
export interface ContractInstance {
    /** Version identifier. Initially one, bumped for any changes to the contract instance struct. */
    version: typeof VERSION;
    /** User-generated pseudorandom value for uniqueness. */
    salt: Fr;
    /** Optional deployer address or zero if this was a universal deploy. */
    deployer: AztecAddress;
    /** Identifier of the contract class for this instance. */
    contractClassId: Fr;
    /** Hash of the selector and arguments to the constructor. */
    initializationHash: Fr;
    /** Optional hash of the struct of public keys used for encryption and nullifying by this contract. */
    publicKeysHash: Fr;
}
export type ContractInstanceWithAddress = ContractInstance & {
    address: AztecAddress;
};
export declare class SerializableContractInstance {
    readonly version: 1;
    readonly salt: Fr;
    readonly deployer: AztecAddress;
    readonly contractClassId: Fr;
    readonly initializationHash: Fr;
    readonly publicKeysHash: Fr;
    constructor(instance: ContractInstance);
    toBuffer(): Buffer;
    /** Returns a copy of this object with its address included. */
    withAddress(address: AztecAddress): ContractInstanceWithAddress;
    static fromBuffer(bufferOrReader: Buffer | BufferReader): SerializableContractInstance;
    static random(opts?: Partial<FieldsOf<ContractInstance>>): SerializableContractInstance;
    static empty(): SerializableContractInstance;
}
export {};
//# sourceMappingURL=contract_instance.d.ts.map