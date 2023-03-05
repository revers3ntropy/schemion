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
});

describe('`matches` Arrays', () => {
    test('Matches array of numbers', () => {
        expect(matches([1, 2, 3], ['number']))
            .toBe(false);
        expect(matches([1, 2, 3], ['string']))
            .toBe(false);
        expect(matches([], ['string']))
            .toBe(false);
        expect(matches(null, ['string']))
            .toBe(false);
        expect(matches('', ['string']))
            .toBe(false);
        expect(matches([1, 2, 3], ['number', 'number']))
            .toBe(false);
        expect(matches([1, 2, 3], ['number', 'number', 'number']))
            .toBe(true);
        expect(matches([[ 1 ]], [[ 'number' ]]))
            .toBe(true);
        expect(matches([[ 1 ], 2], [[ 'number', 'number' ]]))
            .toBe(false);
        expect(matches([[ 1 ], [ 2 ]], [[ 'number', 'number' ]]))
            .toBe(false);
        expect(matches([[ 1, 2 ]], [[ 'number', 'number' ]]))
            .toBe(true);
        expect(matches([[ ]], [[ ]]))
            .toBe(true);
        expect(matches([], []))
            .toBe(true);
        expect(matches([ 2 ], []))
            .toBe(false);
        expect(matches([[]], []))
            .toBe(false);
    });

    test(`Matches 'any'`, () => {
        expect(matches(1, 'any'))
            .toBe(true);
        expect(matches('1', ['any']))
            .toBe(false);
        expect(matches(true, ['any']))
            .toBe(false);
        expect(matches({}, ['any']))
            .toBe(false);
        expect(matches([], ['any']))
            .toBe(false);
        expect(matches([1], ['any']))
            .toBe(true);
        expect(matches([1, 2], ['any']))
            .toBe(false);
        expect(matches([1, '2'], ['number', 'any']))
            .toBe(true);
        expect(matches([1, '2', true], ['any']))
            .toBe(false);
        expect(matches([1, '2', true], 'any'))
            .toBe(true);
        expect(matches(Example, 'any'))
            .toBe(true);
        expect(matches(new Example, 'any'))
            .toBe(true);
        expect(matches([1, '2'], ['any', 'string']))
            .toBe(true);
        expect(matches([1, '2'], ['any', 'number']))
            .toBe(false);
    });
});

describe('Invalid Schema', () => {
    test('Invalid schema', () => {
        expect(() => matches(1, 'invalid' as any))
            .toThrowError('Invalid schema');
        expect(() => matches(1, ['invalid' as any]))
            .toThrowError('Invalid schema');
        expect(() => matches([], ['invalid' as any]))
            .toThrowError('Invalid schema');
        expect(() => matches(1, Example as any))
            .toThrowError('Invalid schema');
    });
});