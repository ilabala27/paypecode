module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        'root': ['.'],
        'alias': {
          '@assets': './src/assets',
          '@config': './src/config',
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@views': './src/views',
          '@utilis': './src/utilis'
        }
      }
    ]
  ]
};