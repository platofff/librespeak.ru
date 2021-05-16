module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/recommended'
  ],
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'no-undef': 0 // TODO
  }
}
