module.exports = {
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
