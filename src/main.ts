class SchemaError extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'SchemaError';
    }
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

type Schema = keyof TypeMap
    | Schema[]
    | { [key: string]: Schema };

type MatchResult <T> =
    T extends keyof TypeMap
        ? TypeMap[T]
        :
    T extends Schema[]
        ? MatchResult<T[number]>[]
        :
    T extends { [ key: string ]: Schema }
        ? { [K in keyof T]: MatchResult<T[K]> }
        :
    never;

function matchesAtomic (o: unknown, schema: keyof TypeMap): boolean {
    if (schema === 'any') {
        return true;
    }
    return typeof o === schema;
}

function matchArray<T extends Schema> (o: unknown, schema: T[]): o is MatchResult<T> {
    return Array.isArray(o)
        && o.length === schema.length
        && o.every((v, i) => matches(v, schema[i], {
            shouldValidateSchema: false
        }));
}

function validateSchema (schema: unknown): asserts schema is Schema {
    if (typeof schema === 'string') {
        if (!typeMapKeys.includes(schema)) {
            throw new SchemaError('Invalid schema');
        }

    } else if (Array.isArray(schema)) {
        schema.forEach(validateSchema);

    } else {
        throw new SchemaError('Invalid schema');
    }
}

export function matches<T extends Schema> (
    o: unknown,
    schema: T,
    {
        shouldValidateSchema = true
    } = {}
): o is MatchResult<T> {
    if (shouldValidateSchema) {
        validateSchema(schema);
    }

    if (typeof schema === 'string') {
        return matchesAtomic(o, schema);

    } else if (Array.isArray(schema)) {
        return matchArray(o, schema);

    } else {
        return false;
    }
}