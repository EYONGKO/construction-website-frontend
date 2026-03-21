module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        allowedHosts: 'all',
        historyApiFallback: true,
      };
      return webpackConfig;
    },
  },
  devServer: {
    allowedHosts: 'all',
  },
};
