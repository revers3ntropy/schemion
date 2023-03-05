// replaced at compile time with version from package.json
class SchemaError extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'SchemaError';
    }
}

interface Config {
    shouldValidateSchema?: boolean;
    strict?: boolean;
}

type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    object: object;
    function: Function;
    undefined: undefined;
    any: any
    symbol: symbol;
}

const typeMapKeys = [
    'string',
    'number',
    'boolean',
    'object',
    'function',
    'undefined',
    'any',
    'symbol'
];

export type Schema = keyof TypeMap
    | Schema[]
    | { [key: string]: Schema };

export type SchemaResult<T> =
    T extends keyof TypeMap
        ? TypeMap[T]
        :
    T extends Schema[]
        ? SchemaResult<T[number]>[]
        :
    T extends { [ key: string ]: Schema }
        ? { [K in keyof T]: SchemaResult<T[K]> }
        :
    never;

export function matchesAtomic (o: unknown, schema: keyof TypeMap, _: Config): boolean {
    if (schema === 'any') {
        return true;
    }
    return typeof o === schema;
}

export function matchArray<T extends Schema> (o: unknown, schema: T[], config: Config): o is SchemaResult<T> {
    return Array.isArray(o)
        && (o.length === schema.length || !config.strict)
        && schema.every((s, i) => matches(o[i], s, null, {
            ...config,
            shouldValidateSchema: false
        }));
}

export function matchObject<T extends { [k: string]: Schema }, D> (
    o: unknown,
    schema: T,
    defaults: { [P in keyof T]?: SchemaResult<T[P]> } = {},
    config: Config
): o is SchemaResult<T> {
    if (typeof o !== 'object' || o === null) {
        return false;
    }

    // clone so can safely mutate (adding defaults)
    let objClone: Record<string, unknown> = { ...o as Record<string, unknown> };
    for (const key in defaults) {
        objClone[key] ??= defaults[key];
    }

    if (config.strict) {
        if (Object.keys(objClone).length !== Object.keys(schema).length) {
            return false;
        }
    }

    for (const key in schema) {
        if (!matches(objClone[key], schema[key], null, {
            ...config,
            shouldValidateSchema: false
        })) {
            return false;
        }
    }

    return true;
}


export function validateSchema (schema: unknown): asserts schema is Schema {
    if (typeof schema === 'string') {
        if (typeMapKeys.indexOf(schema) < 0) {
            throw new SchemaError('Invalid schema');
        }

    } else if (Array.isArray(schema)) {
        schema.forEach(validateSchema);

    } else if (typeof schema === 'object') {
        Object.keys(schema)
            .forEach(k => validateSchema(schema[k as keyof typeof schema]))

    } else {
        throw new SchemaError('Invalid schema');
    }
}

export function matches<T extends Schema> (
    o: unknown,
    schema: T,
    defaults: T extends object
        ? { [P in keyof T]?: SchemaResult<T[P]> } | null
        : null = null,
    config: Config = {
        shouldValidateSchema: true,
        strict: false
    }
): o is SchemaResult<T> {
    if (config.shouldValidateSchema) {
        validateSchema(schema);
    }

    if (typeof schema === 'string') {
        return matchesAtomic(o, schema as keyof TypeMap, config);
    }
    if (Array.isArray(schema)) {
        return matchArray(o, schema, config);
    }
    if (typeof schema === 'object') {
        return matchObject(o, schema, defaults, config);
    }

    return false;
}

export const VERSION = '__CONST_VERSION';

const schemion = {
    matches,
    VERSION
};

export default schemion;