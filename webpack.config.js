const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpack = require('html-webpack-plugin')

/**
 * Main directory
 */
const maindir = path.resolve(__dirname)

/**
 * Resolve path
 * @param {*} source 
 * @param {*} file 
 * @param {*} param 
 */
const resolvePath = (source, file, param) => {
  source = source.substr(1)
  if(source.length > 0) {
    if(fs.readdirSync('src').includes(source.split('/')[0])) {
      return path.resolve(maindir, 'src', source)
    }
  }
  return undefined
}

/**
 * Export webpack
 */
module.exports = {
  mode: 'development',
  entry: path.resolve(maindir, 'index.js'),
  output: {
    path: path.resolve(maindir, 'dist'),
    sourceMapFilename: '[name]-[contenthash:8].js.map',
    filename: 'static/js/app-bundle-[contenthash:8].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devServer: {
    hot: true,
    port: 3000,
    compress: true,
    devMiddleware: {
      publicPath: '/',
    },
    host: 'localhost',
    historyApiFallback: true,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'file-loader',
            options: {
              name: 'static/media/[name]-[contenthash:8].[ext]',
            },
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: [
              path.resolve(maindir, 'src'),
              path.resolve(maindir, 'index.js'),
            ],
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        esmodules: true,
                      },
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  [
                    'module-resolver',
                    {
                      root: [
                        path.resolve(maindir, 'src')
                      ],
                      resolvePath(source, file, ...param) {
                        return resolvePath(source, file, param)
                      }
                    },
                  ],
                ],
              },
            }
          },
        ]
      }
    ]
    
  },
  plugins: [
    new HtmlWebpack({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'production' || true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}