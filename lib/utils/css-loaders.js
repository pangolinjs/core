module.exports = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      minimize: process.env.PANGOLIN_ENV.startsWith('build')
        ? { mergeRules: false }
        : false,
      sourceMap: true,
      url: false
    }
  },
  {
    loader: 'postcss-loader',
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
