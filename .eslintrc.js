module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: [
        'App.tsx',
        'index.js',
        'RadienceffAncienttalesSrc/**/*.{js,jsx,ts,tsx}',
      ],
      rules: {
        'no-console': 'error',
        'no-debugger': 'error',
      },
    },
  ],
};
