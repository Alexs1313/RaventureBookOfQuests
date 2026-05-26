module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: [
        'App.tsx',
        'index.js',
        'ExplorerMytthofSrc/**/*.{js,jsx,ts,tsx}',
      ],
      rules: {
        'no-console': 'error',
        'no-debugger': 'error',
      },
    },
  ],
};
