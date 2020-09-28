const parser = require("../../babel-curry-syntax/packages/babel-parser/lib/index");

module.exports = function curriedFunctions({ types: t }) {
  return {
    name: "babel-plugin-curried-functions",
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {},
  };
};
