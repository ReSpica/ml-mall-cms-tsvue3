module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential', //vue3规范
    'eslint:recommended', //eslint默认推荐的规范
    '@vue/typescript/recommended', //在vue里面使用ts的规范
    '@vue/prettier', //vue中prettier的规范
    '@vue/prettier/@typescript-eslint' //prettier对ts的规范
    // 'plugin:prettier/recommended'//新加的，学的时候是为了放置我格式化的代码排版跟eslint的有冲突才加的
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off', //requires引用的警告忽视
    '@typescript-eslint/no-explicit-any': ['off'], //any类型警告忽视
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off' //断言警告忽视
  }
};
