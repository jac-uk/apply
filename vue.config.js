// const fs = require('fs');
// const packageJson = fs.readFileSync('./package.json');
// const path = require('path');
// const version = JSON.parse(packageJson).version || 0;
// const webpack = require('webpack');

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat');

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        };
      });
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       'process.env': {
  //         PACKAGE_VERSION: `"${version}"`,
  //       },
  //     }),
  //   ],
  // },
  devServer: {
    port: 8181,
  },
  css: {
    loaderOptions: {
      sass: {
        // always import main.scss first
        additionalData: '@import "@/styles/main.scss";',
      },
    },
  },
  parallel: !process.env.NODE_ENV === 'production',
};
