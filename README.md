# Schemion

Schemion is a lightweight object schema validator for JavaScript/TypeScript.

## Example

```typescript
import { matches } from 'schemion';

// match objects with an intuitive syntax
matches(
    { foo: 'bar', bar: 123 },
    { foo: 'string' }
); // true

// match nested objects and tuples
matches(
    { foo: [ 'foo', 0.2, { bar: [] } ] },
    { foo: [ 'string', 'number', { bar: 'any' } ] }
); // true

// First rate TypeScript support
const foo = { bar: 'bar' };
if (matches(foo, { bar: 'string' })) {
    // foo is now typed as { foo: string }
}

// supply default values
matches(
    { foo: 'bar' },
    { foo: 'string', bar: 'number' },
    { bar: 123 }
); // true
```
