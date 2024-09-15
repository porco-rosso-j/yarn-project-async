import { serializeToBuffer } from '@aztec/foundation/serialize';
export class PrivateKernelEmptyInputs {
    constructor(emptyNested, header, chainId, version, vkTreeRoot) {
        this.emptyNested = emptyNested;
        this.header = header;
        this.chainId = chainId;
        this.version = version;
        this.vkTreeRoot = vkTreeRoot;
    }
    toBuffer() {
        return serializeToBuffer(this.emptyNested, this.header, this.chainId, this.version, this.vkTreeRoot);
    }
    static from(fields) {
        return new PrivateKernelEmptyInputs(fields.emptyNested, fields.header, fields.chainId, fields.version, fields.vkTreeRoot);
    }
}
export class EmptyNestedCircuitInputs {
    toBuffer() {
        return Buffer.alloc(0);
    }
}
export class EmptyNestedData {
    constructor(proof, vk) {
        this.proof = proof;
        this.vk = vk;
    }
    toBuffer() {
        return serializeToBuffer(this.proof, this.vk);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9rZXJuZWxfZW1wdHlfaW5wdXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cnVjdHMva2VybmVsL3ByaXZhdGVfa2VybmVsX2VtcHR5X2lucHV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVVoRSxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQ2tCLFdBQTRCLEVBQzVCLE1BQWMsRUFDZCxPQUFXLEVBQ1gsT0FBVyxFQUNYLFVBQWM7UUFKZCxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQUk7UUFDWCxZQUFPLEdBQVAsT0FBTyxDQUFJO1FBQ1gsZUFBVSxHQUFWLFVBQVUsQ0FBSTtJQUM3QixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8saUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkcsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBMEM7UUFDcEQsT0FBTyxJQUFJLHdCQUF3QixDQUNqQyxNQUFNLENBQUMsV0FBVyxFQUNsQixNQUFNLENBQUMsTUFBTSxFQUNiLE1BQU0sQ0FBQyxPQUFPLEVBQ2QsTUFBTSxDQUFDLE9BQU8sRUFDZCxNQUFNLENBQUMsVUFBVSxDQUNsQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHdCQUF3QjtJQUNuQyxRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxlQUFlO0lBQzFCLFlBQ2tCLEtBQW9ELEVBQ3BELEVBQTJCO1FBRDNCLFVBQUssR0FBTCxLQUFLLENBQStDO1FBQ3BELE9BQUUsR0FBRixFQUFFLENBQXlCO0lBQzFDLENBQUM7SUFFSixRQUFRO1FBQ04sT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0YifQ==