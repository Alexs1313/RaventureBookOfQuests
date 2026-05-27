const path = require('path');

const isProduction =
  process.env.BABEL_ENV === 'production' || process.env.NODE_ENV === 'production';

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ...(isProduction ? ['transform-remove-console'] : []),
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.js',
          '.json',
        ],
        alias: {
          '@src': path.resolve(__dirname, 'AnncintTlllsmythhhsSrc'),
        },
      },
    ],
  ],
};
