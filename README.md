# babel-plugin-curried-functions

_Note: This is an experimental plugin made as part of my master thesis with the intent of getting to know the Babel-compiler and its extensibility._

This plugin adds the reserved keyword `curry` which can prefix a function definition in order to make it curried. For the sake of simplicity currying arrow-functions is not supported.

## Syntax

### In

```javascript
curry function f(a, b, c) {
    ...
}
```

### Out

```javascript
function curry(fn) {
  const numParamsRequired = fn.length;

  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);

      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }

      return curryFactory(newParams);
    }
  }

  return curryFactory([]);
}

const a = curry(function f(a, b, c) {
    ...
});
```
