import { assert } from './js_utils.js';
/**
 * Handles mapping of classes to names, and calling toString and fromString to convert to and from JSON-friendly formats.
 * Takes a class map as input.
 */
export class ClassConverter {
    /**
     * Create a class converter from a table of classes.
     * @param stringClassMap - The class table of string encoded classes.
     * @param objectClassMap - The class table of complex object classes
     */
    constructor(stringClassMap, objectClassMap) {
        this.toClass = new Map();
        this.toName = new Map();
        if (stringClassMap) {
            for (const key of Object.keys(stringClassMap)) {
                this.register(key, stringClassMap[key], 'string');
            }
        }
        if (objectClassMap) {
            for (const key of Object.keys(objectClassMap)) {
                this.register(key, objectClassMap[key], 'object');
            }
        }
    }
    /**
     * Register a class with a certain name.
     * This name is used for conversion from and to this class.
     * @param type - The class name to use for serialization.
     * @param class_ - The class object.
     * @param encoding - Whether the class is a complex object or simply represented by a string.
     */
    register(type, class_, encoding) {
        assert(type !== 'Buffer', "'Buffer' handling is hardcoded. Cannot use as name.");
        assert(class_.prototype['toString'] || class_.prototype['toJSON'], `Class ${type} must define a toString() OR toJSON() method.`);
        assert(class_['fromString'] || class_['fromJSON'], `Class ${type} must define a fromString() OR fromJSON() static method.`);
        this.toName.set(class_, [type, encoding]);
        this.toClass.set(type, [class_, encoding]);
    }
    /**
     * Does this type name have a registered class?
     * @param type - The type name.
     * @returns If there's a registered class.
     */
    isRegisteredClassName(type) {
        return this.toClass.has(type);
    }
    /**
     * Is this class object registered?
     * @param obj - The class object.
     * @returns If it is a registered class.
     */
    isRegisteredClass(obj) {
        // const name = obj.prototype.constructor.name;
        // console.log('isRegisteredClass: ', obj);
        if (!obj || !obj.constructor)
            return false;
        const name = obj.constructor.name;
        return this.toName.has(obj) || this.isRegisteredClassName(name);
    }
    /**
     * Convert a JSON-like object to a class object.
     * @param jsonObj - An object encoding a class.
     * @returns The class object.
     */
    toClassObj(jsonObj) {
        const result = this.toClass.get(jsonObj.type);
        assert(result, `Could not find type in lookup.`);
        const [class_, encoding] = result;
        if (encoding === 'string' && typeof jsonObj.data === 'string') {
            return class_.fromString(jsonObj.data);
        }
        else {
            return class_.fromJSON(jsonObj.data);
        }
    }
    /**
     * Convert a class object to a JSON object.
     * @param classObj - A JSON encoding a class.
     * @returns The class object.
     */
    toJsonObj(classObj) {
        const { type, encoding } = this.lookupObject(classObj);
        const data = encoding === 'string' ? classObj.toString() : classObj.toJSON();
        return { type: type, data };
    }
    /**
     * Loads the corresponding type for this class based on constructor first and constructor name if not found.
     * Constructor match works in the event of a minifier changing function names, and constructor name match
     * works in the event of duplicated instances of node modules being loaded (see #1826).
     * @param classObj - Object to lookup in the registered types.
     * @returns Registered type name and encoding.
     */
    lookupObject(classObj) {
        const nameResult = this.toName.get(classObj.constructor);
        if (nameResult) {
            return { type: nameResult[0], encoding: nameResult[1] };
        }
        const classResult = this.toClass.get(classObj.constructor.name);
        if (classResult) {
            return { type: classObj.constructor.name, encoding: classResult[1] };
        }
        throw new Error(`Could not find class ${classObj.constructor.name} in lookup.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NfY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2pzb24tcnBjL2NsYXNzX2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUd2Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUl6Qjs7OztPQUlHO0lBQ0gsWUFBWSxjQUEwQyxFQUFFLGNBQXdDO1FBUnhGLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUN0RCxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7UUFRM0QsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBZSxFQUFFLFFBQXVCO1FBQzdELE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLHFEQUFxRCxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMs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