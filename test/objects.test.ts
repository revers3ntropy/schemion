import { describe, expect, test } from '@jest/globals';
import { matches } from '../src/main';

describe('`matches` Objects', () => {
    test('Empty cases', () => {
        expect(matches({}, {})).toBe(true);
        expect(matches({}, {}, {})).toBe(true);
        expect(matches(null, {}, {})).toBe(false);
    });

    test('Simple cases', () => {
        expect(matches({ a: 1 }, { a: 'number' }))
            .toBe(true);
        expect(matches({ a: 1 }, { a: 'string' }))
            .toBe(false);
        expect(matches({ a: 1 }, { a: 'number' }, { a: 1 }))
            .toBe(true);
        expect(matches({}, { a: 'number' }, { a: 2 }))
            .toBe(true);
        expect(matches(null, { a: 'number' }, { a: 2 }))
            .toBe(false);
    });

    test('All base types', () => {
        expect(matches({ a: 1 }, { a: 'number' }))
            .toBe(true);
        expect(matches({}, { a: 'number' }))
            .toBe(false);

        expect(matches({ a: String() }, { a: 'string' }))
            .toBe(true);
        expect(matches({ a: 'hi' }, { a: 'string' }))
            .toBe(true);
        expect(matches({}, { a: 'string' }))
            .toBe(false);
        expect(matches({ a: 1 }, { a: 'string' }))
            .toBe(false);
        expect(matches({ a: 1.0.toString() }, { a: 'string' }))
            .toBe(true);
        expect(matches({ a: null }, { a: 'string' }))
            .toBe(false);

        expect(matches({ a: true }, { a: 'boolean' }))
            .toBe(true);
        expect(matches({ a: false }, { a: 'boolean' }))
            .toBe(true);
        expect(matches({ a: null }, { a: 'boolean' }))
            .toBe(false);
        expect(matches({ a: null }, { a: 'boolean' }))
            .toBe(false);

        expect(matches({ a: {} }, { a: 'object' }))
            .toBe(true);
        expect(matches({ a: null }, { a: 'object' }))
            .toBe(true);
        expect(matches({ a: new class {} }, { a: 'object' }))
            .toBe(true);
        expect(matches({}, { a: 'object' }))
            .toBe(false);
        expect(matches({ a: () => 0 }, { a: 'object' }))
            .toBe(false);
        expect(matches({ a: [] }, { a: 'object' }))
            .toBe(true);
        expect(matches({ a: [ {} ] }, { a: 'object' }))
            .toBe(true);
        expect(matches({ a: [ [] ] }, { a: 'object' }))
            .toBe(true);

        expect(matches({ a: class {} }, { a: 'function' }))
            .toBe(true);
        expect(matches({ a: (): void => void 0 }, { a: 'function' }))
            .toBe(true);
        expect(matches({ a: void 0 }, { a: 'function' }))
            .toBe(false);
        expect(matches({ a: [] }, { a: 'function' }))
            .toBe(false);

        expect(matches({ a: undefined }, { a: 'undefined' }))
            .toBe(true);
        expect(matches({ a: void 0 }, { a: 'undefined' }))
            .toBe(true);
        expect(matches({}, { a: 'undefined' }))
            .toBe(true);
    });

    test('Default Values', () => {
        expect(matches({ b: null, a: undefined }, { a: 'number' }, { a: 2 }))
            .toBe(true);

        expect(matches({ a: undefined }, { a: 'string' }, { a: 'hi' }))
            .toBe(true);
        expect(matches({ a: null }, { a: 'string' }, { a: 'hi' }))
            .toBe(true);
        expect(matches({ a: 0 }, { a: 'string' }, { a: 'hi' }))
            .toBe(false);
        expect(matches({}, { a: 'undefined' }))
            .toBe(true);
        expect(matches({ a: 1 }, { a: 'undefined' }))
            .toBe(false);
        expect(matches({ a: 1 }, { a: 'undefined' }, { a: undefined }))
            .toBe(false);
        expect(matches({ a: undefined }, { a: 'undefined' }, { a: undefined }))
            .toBe(true);

        expect(matches({ a: 1, b: 2 }, { a: 'number' }))
            .toBe(true);
        expect(matches({ a: 1, b: false }, { a: 'number', b: 'boolean' }))
            .toBe(true);
        expect(matches({ a: 1, b: 2 }, { a: 'number', b: 'string' }))
            .toBe(false);
        expect(matches({ a: 1, b: 'hi' }, { a: 'number', b: 'string', c: 'boolean' }))
            .toBe(false);
        expect(matches({ b: 2 }, { a: 'number', b: 'number' }, { a: 1, b: 3 }))
            .toBe(true);
    });
});
