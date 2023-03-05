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
        && o.every((v, i) => matches(v, schema[i], undefined, {
            shouldValidateSchema: false
        }));
}

function matchObject<T extends { [k: string]: Schema }, D> (
    o: unknown,
    schema: T,
    defaults: { [P in keyof T]?: MatchResult<T[P]> } = {}
): o is MatchResult<T> {
    if (typeof o !== 'object' || o === null) {
        return false;
    }

    // clone so can safely mutate (adding defaults)
    let objClone: Record<string, unknown> = { ...o as Record<string, unknown> };
    for (const key in defaults) {
        objClone[key] ??= defaults[key];
    }

    for (const key in schema) {
        if (!matches(objClone[key], schema[key], undefined, {
            shouldValidateSchema: false
        })) {
            return false;
        }
    }
    return true;
}


function validateSchema (schema: unknown): asserts schema is Schema {
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
        ? { [P in keyof T]?: MatchResult<T[P]> } | undefined
        : undefined = undefined,
    {
        shouldValidateSchema = true,
    }: {
        shouldValidateSchema?: boolean;
    } = {}
): o is MatchResult<T> {
    if (shouldValidateSchema) {
        validateSchema(schema);
    }

    if (typeof schema === 'string') {
        return matchesAtomic(o, schema as keyof TypeMap);
    }
    if (Array.isArray(schema)) {
        return matchArray(o, schema);
    }
    if (typeof schema === 'object') {
        return matchObject(o, schema, defaults);
    }

    return false;
}