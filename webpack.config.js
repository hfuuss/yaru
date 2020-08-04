// // Require the webpack-chain module. This module exports a single
// // constructor function for creating a configuration API.
// const Config = require('webpack-chain');

// // Instantiate the configuration with a new API
 const config = new Config();

// // Make configuration changes using the chain API.
// // Every API call tracks a change to the stored configuration.

 config
   .output
     .path('docs')
     .publicPath('/yaru/')
// config
//   .devServer
//   .publicPath('/yaru/')
 module.exports = config.toConfig();
// // module.exports = {
// //   resolve: {
// //     alias: {
// //       '@': require('path').resolve(__dirname, 'src'),
// //     },
// //   },
// // };
