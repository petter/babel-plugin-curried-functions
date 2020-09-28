const parser = require("../../babel-curry-syntax/packages/babel-parser/lib/index");

const curryFunc = parser.parse(
  `
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
`
).program.body[0];

let hasInsertedCurry = false;
function insertCurry(path, t) {
  if (!hasInsertedCurry) {
    const programPath = path.findParent((path) => path.isProgram());
    programPath.unshiftContainer("body", curryFunc);

    hasInsertedCurry = true;
  }
  return "curry";
}

module.exports = function curriedFunctions({ types: t }) {
  return {
    name: "babel-plugin-curried-functions",
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      FunctionDeclaration(path) {
        if (path.node.curry) {
          path.node.curry = false;
          path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(path.get("id.name").node),
                t.callExpression(t.identifier(insertCurry(path, t)), [
                  t.toExpression(path.node),
                ])
              ),
            ])
          );
        }
      },
    },
  };
};
