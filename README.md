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

// TypeScript support
const foo = { bar: 'bar' };
if (schemion.matches(foo, { bar: 'string' })) {
    foo.bar;
    //  ^? string
    foo.foo;
    //  ^? error, foo is not a property of `{ bar: string }`
}

// supply default values, which are applied to the object
const myObj = { foo: 'bar' };
schemion.matches(
    myObj,
    { foo: 'string', bar: 'number' },
    { bar: 123 }
); // true
myObj.bar; // 123

// strict mode
schemion.matches(
    { foo: 'bar', foobar: 10 },  // object
    { foo: 'string' },           // schema
    null,                        // default values
    { strict: true }             // config
); // false, but true if `strict: false`


// match primitive types
schemion.matches(123, 'number'); // true
schemion.matches(123, 'string'); // false
schemion.matches([], 'any');     // true
schemion.matches([], 'object');  // true
```
