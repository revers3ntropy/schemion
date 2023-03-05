import { describe, expect, test } from '@jest/globals';
import { matches } from '../src/main';
import { Alike, Equal, Expect, ExpectFalse, IsAny, ExpectExtends, NotAny } from "./test";

class Example {}
class Child extends Example {}

const getBoolean = () => true;

describe('`matches` Primitives', () => {
    test('Matches number', () => {
        expect(matches(1, 'number')).toBe(true);
        expect(matches(1.2, 'number')).toBe(true);
        expect(matches(undefined, 'number')).toBe(false);
        expect(matches(null, 'number')).toBe(false);
        expect(matches('', 'number')).toBe(false);
        expect(matches(Example, 'number')).toBe(false);
        expect(matches(new Example, 'number')).toBe(false);

        let n = 1 as unknown;
        if (matches(n, 'number')) {
            expect(n).toBe(1);
            type _ = [
                Expect<Equal<typeof n, number>>,
                ExpectFalse<Equal<typeof n, string>>,
                ExpectFalse<Equal<typeof n, bigint>>,
                ExpectFalse<IsAny<typeof n>>,
                Expect<NotAny<typeof n>>,
                ExpectExtends<typeof n, number>,
            ];
        } else {
            type _ = [
                Expect<Equal<typeof n, unknown>>,
            ];
        }

        let n2 = 1 as Child;
        if (matches(n2, 'number')) {
            type _ = [
                Expect<Equal<typeof n2, number>>,
            ];
        } else {
            type _ = [
                Expect<Equal<typeof n2, Child>>,
                ExpectFalse<Equal<typeof n2, number>>,
                Expect<Equal<typeof n2, Example>>,
                ExpectFalse<Equal<typeof n2, object>>,
                Expect<Equal<typeof n2, {}>>,
            ];
        }
    });

    test('Matches string', () => {
        expect(matches('', 'string')).toBe(true);
        expect(matches(String(), 'string')).toBe(true);
        expect(matches(undefined, 'string')).toBe(false);
        expect(matches(null, 'string')).toBe(false);
        expect(matches(1, 'string')).toBe(false);
        expect(matches(Example, 'string')).toBe(false);
        expect(matches(new Example, 'string')).toBe(false);
    });

    test('Matches boolean', () => {
        expect(matches(true, 'boolean')).toBe(true);
        expect(matches(false, 'boolean')).toBe(true);
        expect(matches(getBoolean(), 'boolean')).toBe(true);
        expect(matches(undefined, 'boolean')).toBe(false);
        expect(matches(null, 'boolean')).toBe(false);
        expect(matches(1, 'boolean')).toBe(false);
        expect(matches(Example, 'boolean')).toBe(false);
        expect(matches(new Example, 'boolean')).toBe(false);
    });

    test('Matches object', () => {
        expect(matches({}, 'object')).toBe(true);
        expect(matches(new Example, 'object')).toBe(true);
        expect(matches(undefined, 'object')).toBe(false);
        expect(matches(null, 'object')).toBe(true);
        expect(matches(1, 'object')).toBe(false);
        expect(matches(Example, 'object')).toBe(false);
        expect(matches(() => {}, 'object')).toBe(false);

        let n: unknown = {};
        if (matches(n, 'object')) {
            expect(n).toEqual({});
            type _ = [
                Expect<Equal<typeof n, object>>,
                ExpectFalse<Equal<typeof n, null>>,
                Expect<ExpectExtends<typeof n, null>>,
                ExpectFalse<ExpectExtends<null, typeof n>>,
                ExpectFalse<Alike<typeof n, null>>,
                ExpectFalse<Equal<typeof n, {}>>,
                ExpectFalse<Equal<typeof n, Example>>,
                ExpectFalse<Equal<typeof n, string>>,
                ExpectFalse<Equal<typeof n, bigint>>
            ];
        }
    });

    test('Matches function', () => {
        expect(matches(() => {}, 'function')).toBe(true);
        expect(matches(Example, 'function')).toBe(true);
        expect(matches(new Example, 'function')).toBe(false);
        expect(matches(undefined, 'function')).toBe(false);
        expect(matches(null, 'function')).toBe(false);
        expect(matches(1, 'function')).toBe(false);
        expect(matches({}, 'function')).toBe(false);
    });

    test('Matches undefined', () => {
        expect(matches(undefined, 'undefined')).toBe(true);
        expect(matches(void 0, 'undefined')).toBe(true);
        expect(matches(null, 'undefined')).toBe(false);
        expect(matches(1, 'undefined')).toBe(false);
        expect(matches(Example, 'undefined')).toBe(false);
        expect(matches({}, 'undefined')).toBe(false);
        expect(matches(() => {}, 'undefined')).toBe(false);
    });

    test('Matches any', () => {
        expect(matches(undefined, 'any')).toBe(true);
        expect(matches(null, 'any')).toBe(true);
        expect(matches(1, 'any')).toBe(true);
        expect(matches(Example, 'any')).toBe(true);
        expect(matches(new Example, 'any')).toBe(true);
        expect(matches({}, 'any')).toBe(true);
        expect(matches((): void => void 0, 'any')).toBe(true);
    });

    test('Matches symbol', () => {
        expect(matches(Symbol(), 'symbol')).toBe(true);
        expect(matches(Symbol('foo'), 'symbol')).toBe(true);
        expect(matches(undefined, 'symbol')).toBe(false);
        expect(matches(null, 'symbol')).toBe(false);
        expect(matches(1, 'symbol')).toBe(false);
        expect(matches(Example, 'symbol')).toBe(false);
        expect(matches({}, 'symbol')).toBe(false);
        expect(matches((): void => void 0, 'symbol')).toBe(false);
    });
});
