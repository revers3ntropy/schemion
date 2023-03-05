import { describe, expect, test } from '@jest/globals';
import { matches } from '../src/main';

class Example {}

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