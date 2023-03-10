// Generated by dts-bundle v0.7.3

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
    any: any;
    symbol: symbol;
};
export type Schema = keyof TypeMap | Schema[] | {
    [key: string]: Schema;
};
export type SchemaResult<T> = T extends keyof TypeMap ? TypeMap[T] : T extends Schema[] ? SchemaResult<T[number]>[] : T extends object ? {
    [K in keyof T]: SchemaResult<T[K]>;
} : never;
export function matchesAtomic(o: unknown, schema: keyof TypeMap, _: Config): boolean;
export function matchArray<T extends Schema>(o: unknown, schema: T[], config: Config): o is SchemaResult<T>;
export function matchObject<T extends {
    [k: string]: Schema;
}, D>(o: unknown, schema: T, defaults: {
    [P in keyof T]?: SchemaResult<T[P]>;
}, config: Config): o is SchemaResult<T>;
export function validateSchema(schema: unknown): asserts schema is Schema;
export function matches<T extends Schema>(o: unknown, schema: T, defaults?: T extends object ? {
    [P in keyof T]?: SchemaResult<T[P]>;
} | null : null, config?: Config): o is SchemaResult<T>;
export const VERSION = "0.0.11";
const schemion: {
    matches: typeof matches;
    VERSION: string;
};
export default schemion;

