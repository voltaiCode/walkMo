const path = require('path');

module.exports = {
    entry: ['./client/index.js'], // can be multiple if multi page web, array of objects
    output: {
     path: path.resolve(__dirname, 'build'),
     filename: 'bundle.js'
    },
    devServer: {
      contentBase: "./client",
      publicPath: '/build/',
      proxy: {
          '/signup': 'http://localhost:3000',
          '/login': 'http://localhost:3000'
      }
    },
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env',
                        '@babel/preset-react']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            // style-loader
           'style-loader',
            // css-loader
            'css-loader',
            // sass-loader
            'sass-loader',
          ]
        }
      ]
    },
  };