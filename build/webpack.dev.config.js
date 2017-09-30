const path = require('path')
const webpack = require('webpack')

const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (cwd) => {
  // Lint JavaScript
  const eslintLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    enforce: 'pre'
  }

  // Transpile with Babel
  const babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }

  // Compile Sass
  const cssLoader = {
    test: /\.(css|scss)$/,
    exclude: /node_modules/,
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
          precision: 10,
          sourceMap: true
        }
      }
    ]
  }

  // Set `process.env`
  const processEnvPlugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      FESG_ENV: `"${process.env.FESG_ENV}"`
    }
  })

  // Lint CSS
  const stylelintPlugin = new StylelintPlugin({
    syntax: 'scss'
  })

  // Hot Module Replacement
  const hmrPlugin = new webpack.HotModuleReplacementPlugin()

  return {
    context: cwd,
    entry: ['./src/main.js', `${__dirname}/dev-client`],
    output: {
      path: `${cwd}/dev`,
      filename: 'js/[name].js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        'fesg': path.join(__dirname, '../docs')
      }
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [eslintLoader, babelLoader, cssLoader]
    },
    plugins: [
      processEnvPlugin,
      stylelintPlugin,
      hmrPlugin
    ]
  }
}
