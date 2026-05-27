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
          '@navigation': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesNavigation'),
          '@screens': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesScreens'),
          '@components': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents'),
          '@data': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesData'),
          '@palette': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesPalette'),
          '@types': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesTypes'),
          '@loungeKit': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesLoungeKit'),
          '@assets': path.resolve(__dirname, 'RadienceffAncienttalesSrc/RadienceffAncienttalesComponents/RadienceffAncienttalesCore/RadienceffAncienttalesAssets'),
        },
      },
    ],
  ],
};
