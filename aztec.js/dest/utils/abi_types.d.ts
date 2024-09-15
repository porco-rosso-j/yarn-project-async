import { type AztecAddress, type EthAddress, type EventSelector, type Fr, type FunctionSelector } from '@aztec/circuits.js';
/** Any type that can be converted into a field for a contract call. */
export type FieldLike = Fr | Buffer | bigint | number | {
    toField: () => Fr;
};
/** Any type that can be converted into an EthAddress Aztec.nr struct. */
export type EthAddressLike = {
    address: FieldLike;
} | EthAddress;
/** Any type that can be converted into an AztecAddress Aztec.nr struct. */
export type AztecAddressLike = {
    address: FieldLike;
} | AztecAddress;
/** Any type that can be converted into a FunctionSelector Aztec.nr struct. */
export type FunctionSelectorLike = FieldLike | FunctionSelector;
/** Any type that can be converted into an EventSelector Aztec.nr struct. */
export type EventSelectorLike = FieldLike | EventSelector;
/** Any type that can be converted into a struct with a single `inner` field. */
export type WrappedFieldLike = {
    inner: FieldLike;
} | FieldLike;
//# sourceMappingURL=abi_types.d.ts.map