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
          '@navigation': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofNavigation'),
          '@screens': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofScreens'),
          '@components': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofComponents'),
          '@data': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofData'),
          '@palette': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofPalette'),
          '@types': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofTypes'),
          '@loungeKit': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofLoungeKit'),
          '@assets': path.resolve(__dirname, 'ExplorerMytthofSrc/ExplorerMytthofAssets'),
        },
      },
    ],
  ],
};
