const parser = require("../../babel-curry-syntax/packages/babel-parser/lib/index");

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
                t.callExpression(t.identifier("curry"), [
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
