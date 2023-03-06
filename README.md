# Schemion

Schemion is a lightweight object schema validator for JavaScript/TypeScript.

## Example

```typescript
const schemion = require('schemion');
// Or: 
// import { default as schemion } from 'schemion';

// match objects with an intuitive syntax
schemion.matches(
    { foo: 'bar', bar: 123 }, // object
    { foo: 'string' }         // schema
); // true

// match nested objects and tuples
schemion.matches(
    { foo: [ 'foo', 0.2, { bar: [] } ] },
    { foo: [ 'string', 'number', { bar: 'any' } ] }
); // true

// First rate TypeScript support
const foo = { bar: 'bar' };
if (schemion.matches(foo, { bar: 'string' })) {
    // foo is now typed as { foo: string }
}

// supply default values
schemion.matches(
    { foo: 'bar' },
    { foo: 'string', bar: 'number' },
    { bar: 123 }
); // true

// strict mode
schemion.matches(
    { foo: 'bar', foobar: 10 },  // object
    { foo: 'string' },           // schema
    null,                        // no default values
    { strict: true }             // config
); // false, but true if `strict = false`
```
