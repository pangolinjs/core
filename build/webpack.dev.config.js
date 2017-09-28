const webpack = require('webpack')

const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (cwd) => {
  // ESLint loader
  const eslintLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre'
  }

  // Babel loader
  const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }

  // CSS Loader
  const cssLoader = {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  }

  // NODE_ENV plugin
  const nodeEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })

  // Stylelint plugin
  const stylelintPlugin = new StylelintPlugin({
    syntax: 'scss'
  })

  // Hot Module Replacement plugin
  const hmrPlugin = new webpack.HotModuleReplacementPlugin()

  // Don't emit files with error plugin
  const noErrorEmitPlugin = new webpack.NoEmitOnErrorsPlugin()

  return {
    context: cwd,
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    output: {
      path: `${cwd}/dev`,
      filename: 'js/[name].js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [eslintLoader, babelLoader, cssLoader]
    },
    plugins: [
      nodeEnvPlugin,
      stylelintPlugin,
      hmrPlugin,
      noErrorEmitPlugin
    ]
  }
}
