module.exports = (api) => {
  api.cache(true);
  
  return {
    presets: [],
    plugins: [
      ['module-resolver', {
        alias: {
          '@Models': './src/Models',
          '@Assets': './src/Assets',
          '@Screens': './src/Screens',
          '@Components': './src/Components',
        }
      }]
    ]
  }
}
