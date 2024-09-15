var _a, _BlockProofError_name;
import { __classPrivateFieldGet } from "tslib";
export class BlockProofError extends Error {
    constructor(message, txHashes) {
        super(message);
        this.txHashes = txHashes;
        this.name = __classPrivateFieldGet(_a, _a, "f", _BlockProofError_name);
    }
    static isBlockProofError(err) {
        return err && typeof err === 'object' && err.name === __classPrivateFieldGet(_a, _a, "f", _BlockProofError_name);
    }
}
_a = BlockProofError;
_BlockProofError_name = { value: 'BlockProofError' };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmVyLWNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmZhY2VzL3Byb3Zlci1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF1Q0EsTUFBTSxPQUFPLGVBQWdCLFNBQVEsS0FBSztJQUl4QyxZQUFZLE9BQWUsRUFBa0IsUUFBa0I7UUFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRDRCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFGdEQsU0FBSSxHQUFHLHVCQUFBLEVBQWUsaUNBQU0sQ0FBQztJQUl0QyxDQUFDO0lBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVE7UUFDL0IsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssdUJBQUEsRUFBZSxpQ0FBTSxDQUFDO0lBQzlFLENBQUM7OztBQVRNLGlDQUFRLGlCQUFpQixFQUFwQixDQUFxQiJ9