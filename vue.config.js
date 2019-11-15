module.exports = {
  devServer: {
    port: 8181,
  },
  css: {
    loaderOptions: {
      sass: {
        // always import main.scss first
        data: '@import "@/main.scss";',
      },
    },
  },
};
