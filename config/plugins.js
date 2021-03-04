// Configurations

// webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const paths = require('./paths');
const SizeCheckPlugin = require('./util/sizeCheckPlugin');

module.exports = (env, multisite) => {
  // Start with plugins always used.
  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name]/css/style.css',
    }),
    new StyleLintPlugin({
      configFile: './config/linters/.stylelintrc.json',
      files: ['src/properties/**/*.scss', 'src/styles/**/*.scss', 'components/features/**/*.scss'],
    }),
  ];

  // Production-only plugins.
  if (env.prod) {
    plugins.push(
      new CleanWebpackPlugin([paths.dist], {
        verbose: true,
        root: paths.base,
      }),
    );

    const sizeCheckEntries = [];
    Object.keys(multisite).forEach((site) => {
      sizeCheckEntries.push({
        fileName: `${site}/css/style.css`,
        maxSize: 80000,
        warningSize: 70000,
      });
      sizeCheckEntries.push({
        fileName: `${site}-amp/css/style.css`,
        maxSize: 75000,
        warningSize: 70000,
      });
    });
    plugins.push(new SizeCheckPlugin(sizeCheckEntries));
  }

  return plugins;
};
