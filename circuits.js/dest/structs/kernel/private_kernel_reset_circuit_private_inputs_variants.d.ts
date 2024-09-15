import { MAX_KEY_VALIDATION_REQUESTS_PER_TX, MAX_NOTE_HASH_READ_REQUESTS_PER_TX, MAX_NULLIFIER_READ_REQUESTS_PER_TX } from '../../constants.gen.js';
import type { PrivateKernelResetCircuitPrivateInputs } from './private_kernel_reset_circuit_private_inputs.js';
export declare const PRIVATE_RESET_VARIANTS: {
    readonly small: {
        readonly NOTE_HASH_PENDING_AMOUNT: 8;
        readonly NOTE_HASH_SETTLED_AMOUNT: 8;
        readonly NULLIFIER_PENDING_AMOUNT: 8;
        readonly NULLIFIER_SETTLED_AMOUNT: 8;
        readonly NULLIFIER_KEYS: 8;
    };
    readonly medium: {
        readonly NOTE_HASH_PENDING_AMOUNT: 16;
        readonly NOTE_HASH_SETTLED_AMOUNT: 16;
        readonly NULLIFIER_PENDING_AMOUNT: 16;
        readonly NULLIFIER_SETTLED_AMOUNT: 16;
        readonly NULLIFIER_KEYS: 16;
    };
    readonly big: {
        readonly NOTE_HASH_PENDING_AMOUNT: 32;
        readonly NOTE_HASH_SETTLED_AMOUNT: 32;
        readonly NULLIFIER_PENDING_AMOUNT: 32;
        readonly NULLIFIER_SETTLED_AMOUNT: 32;
        readonly NULLIFIER_KEYS: 32;
    };
    readonly full: {
        readonly NOTE_HASH_PENDING_AMOUNT: 64;
        readonly NOTE_HASH_SETTLED_AMOUNT: 64;
        readonly NULLIFIER_PENDING_AMOUNT: 64;
        readonly NULLIFIER_SETTLED_AMOUNT: 64;
        readonly NULLIFIER_KEYS: 64;
    };
};
export type PrivateKernelResetTags = keyof typeof PRIVATE_RESET_VARIANTS;
export type PrivateKernelResetCircuitPrivateInputsVariants = PrivateKernelResetCircuitPrivateInputs<8, 8, 8, 8, 8, 'small'> | PrivateKernelResetCircuitPrivateInputs<16, 16, 16, 16, 16, 'medium'> | PrivateKernelResetCircuitPrivateInputs<32, 32, 32, 32, 32, 'big'> | PrivateKernelResetCircuitPrivateInputs<typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX, typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX, typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX, typeof MAX_KEY_VALIDATION_REQUESTS_PER_TX, 'full'>;
//# sourceMappingURL=private_kernel_reset_circuit_private_inputs_variants.d.ts.map