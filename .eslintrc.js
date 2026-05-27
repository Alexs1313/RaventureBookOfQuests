module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: [
        'App.tsx',
        'index.js',
        'AnncintTlllsmythhhsSrc/**/*.{js,jsx,ts,tsx}',
      ],
      rules: {
        'no-console': 'error',
        'no-debugger': 'error',
      },
    },
  ],
};
