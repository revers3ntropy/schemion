import { describe, expect, test } from '@jest/globals';
import { matches } from '../src/main';
import { Alike, Equal, Expect, ExpectFalse, IsAny, ExpectExtends, NotAny } from "./test";

class Example {}

describe('`matches` Arrays', () => {
    test('Matches array of numbers', () => {
        expect(matches([1, 2, 3], ['number']))
            .toBe(true);
        expect(matches([1, 2, 3], ['number'], null, { strict: true }))
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
            .toBe(true);
        expect(matches([1, 2, 3], ['number', 'number'], null, { strict: true }))
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
            .toBe(true);
        expect(matches([ 2 ], [], null, { strict: true }))
            .toBe(false);
        expect(matches([[]], []))
            .toBe(true);
        expect(matches([[]], [], null, { strict: true }))
            .toBe(false);
    });

    test(`Matches 'any'`, () => {
        expect(matches([], ['any'], null, { strict: true }))
            .toBe(false);
        expect(matches([], ['any']))
            .toBe(true);
        expect(matches([1], ['any']))
            .toBe(true);
        expect(matches([1, 2], ['any']))
            .toBe(true);
        expect(matches([1, 2], ['any'], null, { strict: true }))
            .toBe(false);
        expect(matches([1, '2'], ['number', 'any']))
            .toBe(true);
        expect(matches([1, '2', true], ['any'], null, { strict: true }))
            .toBe(false);
        expect(matches([1, '2', true], ['any']))
            .toBe(true);
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
