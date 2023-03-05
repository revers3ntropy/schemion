import { describe, expect, test } from '@jest/globals';
import { matches } from '../src/main';
import { matches as matches2, VERSION } from '../dist';
import * as lib from '../dist';

class Example {}

describe('Usage', () => {
    test('Can be imported', async () => {
        expect(matches).toBeDefined();
        expect(matches2).toBeDefined();
        expect(lib.matches).toBeDefined();
        const matches3 = await import('../dist').then(m => m.matches);
        expect(matches3).toBeDefined();
    });
});

describe('version', () => {
    test('version', () => {
        const currentVersion = require('../package.json').version;
        expect(VERSION).toBe(currentVersion);
        expect(lib.VERSION).toBe(currentVersion);
        expect(VERSION).toBe(lib.VERSION);
        expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
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
