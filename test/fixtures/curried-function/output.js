function curry(fn) {
  const numParamsRequired = fn.length;
  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return curryFactory(newParams);
    };
  }
  return curryFactory([]);
}

const f = curry(function f(a, b, c) {
  console.log(a, b, c);
});
