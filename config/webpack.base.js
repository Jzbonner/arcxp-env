// Configurations
const paths = require('./paths');
const rules = require('./rules');
const entries = require('./entries');
const plugins = require('./plugins');

console.log(entries);

// Configuration
module.exports = env => ({
  module: {
    rules: rules(env),
  },
  devtool: env.prod ? 'none' : 'source-map',
  context: paths.base,
  mode: 'none',
  entry: entries,
  output: {
    path: paths.dist,
    filename: '[name]/js/index.js',
  },
  plugins: plugins(env, entries),
});
