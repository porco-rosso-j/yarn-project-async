export function makePublicInputsAndRecursiveProof(inputs, proof, verificationKey) {
    const result = {
        inputs,
        proof,
        verificationKey,
    };
    return result;
}
export var ProvingRequestType;
(function (ProvingRequestType) {
    ProvingRequestType[ProvingRequestType["PRIVATE_KERNEL_EMPTY"] = 0] = "PRIVATE_KERNEL_EMPTY";
    ProvingRequestType[ProvingRequestType["PUBLIC_VM"] = 1] = "PUBLIC_VM";
    ProvingRequestType[ProvingRequestType["PUBLIC_KERNEL_NON_TAIL"] = 2] = "PUBLIC_KERNEL_NON_TAIL";
    ProvingRequestType[ProvingRequestType["PUBLIC_KERNEL_TAIL"] = 3] = "PUBLIC_KERNEL_TAIL";
    ProvingRequestType[ProvingRequestType["BASE_ROLLUP"] = 4] = "BASE_ROLLUP";
    ProvingRequestType[ProvingRequestType["MERGE_ROLLUP"] = 5] = "MERGE_ROLLUP";
    ProvingRequestType[ProvingRequestType["ROOT_ROLLUP"] = 6] = "ROOT_ROLLUP";
    ProvingRequestType[ProvingRequestType["BASE_PARITY"] = 7] = "BASE_PARITY";
    ProvingRequestType[ProvingRequestType["ROOT_PARITY"] = 8] = "ROOT_PARITY";
})(ProvingRequestType || (ProvingRequestType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmluZy1qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJmYWNlcy9wcm92aW5nLWpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQ0EsTUFBTSxVQUFVLGlDQUFpQyxDQUMvQyxNQUFTLEVBQ1QsS0FBMkQsRUFDM0QsZUFBb0M7SUFFcEMsTUFBTSxNQUFNLEdBQXFDO1FBQy9DLE1BQU07UUFDTixLQUFLO1FBQ0wsZUFBZTtLQUNoQixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQU9ELE1BQU0sQ0FBTixJQUFZLGtCQWFYO0FBYkQsV0FBWSxrQkFBa0I7SUFDNUIsMkZBQW9CLENBQUE7SUFDcEIscUVBQVMsQ0FBQTtJQUVULCtGQUFzQixDQUFBO0lBQ3RCLHVGQUFrQixDQUFBO0lBRWxCLHlFQUFXLENBQUE7SUFDWCwyRUFBWSxDQUFBO0lBQ1oseUVBQVcsQ0FBQTtJQUVYLHlFQUFXLENBQUE7SUFDWCx5RUFBVyxDQUFBO0FBQ2IsQ0FBQyxFQWJXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFhN0IifQ==