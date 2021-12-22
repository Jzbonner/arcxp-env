const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  components: ['components/layouts/*.jsx'],
  webpackConfig: {
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
        },
        {
          test: /\.css$/i,
          loader: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  },
};
