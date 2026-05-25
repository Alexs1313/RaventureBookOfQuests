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
          '@navigation': path.resolve(__dirname, 'src/navigation'),
          '@screens': path.resolve(__dirname, 'src/screens'),
          '@components': path.resolve(__dirname, 'src/components'),
          '@data': path.resolve(__dirname, 'src/data'),
          '@palette': path.resolve(__dirname, 'src/palette'),
          '@types': path.resolve(__dirname, 'src/types'),
          '@loungeKit': path.resolve(__dirname, 'src/loungeKit'),
          '@assets': path.resolve(__dirname, 'src/assets'),
        },
      },
    ],
  ],
};
