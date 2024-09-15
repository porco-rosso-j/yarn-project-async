import fs from "fs";
import path from "path";

import {
	MAX_KEY_VALIDATION_REQUESTS_PER_TX,
	MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
	MAX_NULLIFIER_READ_REQUESTS_PER_TX,
} from "../constants.gen.js";

interface ResetVariant {
	tag: string;
	priority: number;
	replacements: {
		NOTE_HASH_PENDING_AMOUNT: number;
		NOTE_HASH_SETTLED_AMOUNT: number;
		NULLIFIER_PENDING_AMOUNT: number;
		NULLIFIER_SETTLED_AMOUNT: number;
		NULLIFIER_KEYS: number;
	};
}

const prelude = `
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
import {
  MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
  MAX_KEY_VALIDATION_REQUESTS_PER_TX,
  MAX_NULLIFIER_READ_REQUESTS_PER_TX,
} from '../../constants.gen.js';
import type { PrivateKernelResetCircuitPrivateInputs } from './private_kernel_reset_circuit_private_inputs.js';
`;

function buildPrivateResetVariantsObject(variants: ResetVariant[]): string {
	let output = "export const PRIVATE_RESET_VARIANTS = {";

	for (const variant of variants) {
		output += `
    ${variant.tag}: {
      NOTE_HASH_PENDING_AMOUNT: ${variant.replacements.NOTE_HASH_PENDING_AMOUNT},
      NOTE_HASH_SETTLED_AMOUNT: ${variant.replacements.NOTE_HASH_SETTLED_AMOUNT},
      NULLIFIER_PENDING_AMOUNT: ${variant.replacements.NULLIFIER_PENDING_AMOUNT},
      NULLIFIER_SETTLED_AMOUNT: ${variant.replacements.NULLIFIER_SETTLED_AMOUNT},
      NULLIFIER_KEYS:  ${variant.replacements.NULLIFIER_KEYS},
    },`;
	}

	output += `
    full: {
      NOTE_HASH_PENDING_AMOUNT: MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
      NOTE_HASH_SETTLED_AMOUNT: MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
      NULLIFIER_PENDING_AMOUNT: MAX_NULLIFIER_READ_REQUESTS_PER_TX,
      NULLIFIER_SETTLED_AMOUNT: MAX_NULLIFIER_READ_REQUESTS_PER_TX,
      NULLIFIER_KEYS: MAX_KEY_VALIDATION_REQUESTS_PER_TX,
    },
  } as const;\n`;
	return output;
}

function buildPrivateResetVariantsType(variants: ResetVariant[]): string {
	let output = "export type PrivateKernelResetCircuitPrivateInputsVariants =\n";

	for (const variant of variants) {
		output += `
    | PrivateKernelResetCircuitPrivateInputs<
      ${variant.replacements.NOTE_HASH_PENDING_AMOUNT},
      ${variant.replacements.NOTE_HASH_SETTLED_AMOUNT},
      ${variant.replacements.NULLIFIER_PENDING_AMOUNT},
      ${variant.replacements.NULLIFIER_SETTLED_AMOUNT},
      ${variant.replacements.NULLIFIER_KEYS},
      '${variant.tag}'
    >
    `;
	}

	output += `
    | PrivateKernelResetCircuitPrivateInputs<
    typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
    typeof MAX_NOTE_HASH_READ_REQUESTS_PER_TX,
    typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX,
    typeof MAX_NULLIFIER_READ_REQUESTS_PER_TX,
    typeof MAX_KEY_VALIDATION_REQUESTS_PER_TX,
    'full'
  >;`;
	return output;
}

function validateVariants(variants: ResetVariant[]) {
	for (const variant of variants) {
		if (
			variant.replacements.NOTE_HASH_PENDING_AMOUNT >
			MAX_NOTE_HASH_READ_REQUESTS_PER_TX
		) {
			throw new Error(
				`NOTE_HASH_PENDING_AMOUNT must be less than ${MAX_NOTE_HASH_READ_REQUESTS_PER_TX}`
			);
		}
		if (
			variant.replacements.NOTE_HASH_SETTLED_AMOUNT >
			MAX_NOTE_HASH_READ_REQUESTS_PER_TX
		) {
			throw new Error(
				`NOTE_HASH_SETTLED_AMOUNT must be less than ${MAX_NOTE_HASH_READ_REQUESTS_PER_TX}`
			);
		}
		if (
			variant.replacements.NULLIFIER_PENDING_AMOUNT >
			MAX_NULLIFIER_READ_REQUESTS_PER_TX
		) {
			throw new Error(
				`NULLIFIER_PENDING_AMOUNT must be less than ${MAX_NULLIFIER_READ_REQUESTS_PER_TX}`
			);
		}
		if (
			variant.replacements.NULLIFIER_SETTLED_AMOUNT >
			MAX_NULLIFIER_READ_REQUESTS_PER_TX
		) {
			throw new Error(
				`NULLIFIER_SETTLED_AMOUNT must be less than ${MAX_NULLIFIER_READ_REQUESTS_PER_TX}`
			);
		}
		if (
			variant.replacements.NULLIFIER_KEYS > MAX_KEY_VALIDATION_REQUESTS_PER_TX
		) {
			throw new Error(
				`NULLIFIER_KEYS must be less than ${MAX_KEY_VALIDATION_REQUESTS_PER_TX}`
			);
		}
	}
}

const resetVariants: ResetVariant[] = JSON.parse(
	// fs.readFileSync(path.resolve('../../noir-projects/noir-protocol-circuits/reset_variants.json'), 'utf8'),
	fs.readFileSync(
		path.resolve(
			"../../../aztec-packages/noir-projects/noir-protocol-circuits/reset_variants.json"
		),
		"utf8"
	)
);

// Sort them by decreasing priority so that the bigger circuits are tried later
resetVariants.sort((a, b) => b.priority - a.priority);

validateVariants(resetVariants);

fs.writeFileSync(
	path.resolve(
		"./src/structs/kernel/private_kernel_reset_circuit_private_inputs_variants.ts"
	),
	`
${prelude}

${buildPrivateResetVariantsObject(resetVariants)}

export type PrivateKernelResetTags = keyof typeof PRIVATE_RESET_VARIANTS;

${buildPrivateResetVariantsType(resetVariants)}`
);
