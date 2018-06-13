module.exports = function({ types: babelTypes }) {
    return {
      name: "rename-func",
      visitor: {
        FunctionDeclaration(path, state) {
            path.node.id.name = (state.opts.prefix || '') + path.node.id.name;
        }
      }
    };
  };
  