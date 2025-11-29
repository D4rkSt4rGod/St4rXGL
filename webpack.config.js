const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'st4rxgl-extension.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'EntrySt4rXGL',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    'three': 'THREE'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};