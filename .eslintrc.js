module.exports = {
  parser: '@typescript-eslint/parser',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      alias: {
        map: [
          ['@', './src/']
        ],
        extensions: ['.tsx', '.ts', '.jsx', '.js']
      }
    }
  },
  rules: {
    'linebreak-style': 0, // 不同操作系统换行符问题.
    'comma-dangle': [2, 'never'], // 对象最后一个不要加逗号.
    'react/jsx-filename-extension': 0, // js中用jsx语法报错.
    'import/extensions': 0, // import .jsx文件报错.
    'no-console': 0,
    'no-static-element-interactions': 0,
    'click-events-have-key-events': 0,
    'import/no-extraneous-dependencies': 0,
    'no-plusplus': 0,
    'no-unescaped-entities': 0,
    'react/no-unescaped-entities': 0,
    'max-len': [2, 120],
    'react/forbid-prop-types': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'global-require': 0,
    'arrow-parens': [2, 'as-needed'],
    'import/prefer-default-export': 0,
    'react/self-closing-comp': 0,
    'no-param-reassign': 0,
    'prefer-template': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'prefer-const': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/require-default-props': 0,
    'no-shadow': 0,
    'react/jsx-props-no-spreading': 0,
    'operator-linebreak': 0,
    'no-unused-vars': 0,
    'radix': 0,
    'func-names': 0
    // 'import/no-unresolved': 0,
  }
}