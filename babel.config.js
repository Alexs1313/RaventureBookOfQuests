const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
          '@app': path.resolve(__dirname, 'src/app'),
          '@features': path.resolve(__dirname, 'src/features'),
          '@shared': path.resolve(__dirname, 'src/shared'),
          '@content': path.resolve(__dirname, 'src/content'),
        },
      },
    ],
  ],
};
