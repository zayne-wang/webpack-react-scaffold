const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const path = require('path');

module.exports = (env, argv) => {
  const isEnvProduction = process.env.NODE_ENV == 'production';
  const isEnvDevelopment = process.env.NODE_ENV == 'development';

  const getCommonStyleLoader = cssOptions => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      { loader: require.resolve('postcss-loader') }
    ].filter(Boolean);

    return loaders;
  };
  /**
   * @type {import("webpack/types").Configuration}
   */
  const config = {
    mode: isEnvProduction ? 'production' : 'development',

    entry: './src/index.tsx',

    output: {
      path: isEnvProduction ? path.resolve(__dirname, 'dist') : undefined,
      filename: isEnvProduction ? 'scripts/[name].[contenthash:10].js' : 'scripts/[name].js',
      chunkFilename: isEnvProduction
        ? 'scripts/[name].[contenthash:10].chunk.js'
        : 'scripts/[name].chunk.js',
      assetModuleFilename: 'assets/images/[hash:10][ext][query]',
      clean: true
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.css$/i,
              exclude: /\.module\.css$/i,
              use: getCommonStyleLoader({
                importLoaders: 1,
                modules: {
                  mode: 'icss'
                }
              })
            },
            {
              test: /\.module\.css$/i,
              use: getCommonStyleLoader({
                importLoaders: 1,
                modules: {
                  mode: 'local'
                }
              })
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024
                }
              }
            },
            {
              test: /\.(ttf|woff2?)$/,
              type: 'asset/resource',
              generator: {
                filename: 'assets/fonts/[hash:10][ext][query]'
              }
            },
            {
              test: /\.(tsx?|jsx?)$/i,
              include: path.resolve(__dirname, 'src'),
              use: require.resolve('babel-loader')
            }
          ]
        }
      ]
    },

    plugins: [
      new EslintWebpackPlugin({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        context: path.resolve(__dirname, "./"),
        exclude: 'node_modules',
        cache: true,
        cacheLocation: path.resolve(__dirname, 'node_modules/.cache/.eslintcache')
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      }),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:10].css',
          chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
        }),
      isEnvDevelopment && new CaseSensitivePathsWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir',
            noErrorOnMissing: true, // 不生成错误
            globOptions: {
              // 忽略文件
              ignore: ['**/index.html']
            },
            info: {
              // 跳过terser压缩js
              minimized: true
            }
          }
        ]
      })
    ].filter(Boolean),

    optimization: {
      minimize: isEnvProduction,
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 权重最低，优先考虑前面内容
            chunks: 'initial'
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
      }
    },

    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },

    devServer: {
      open: true,
      host: 'localhost',
      port: 3000,
      hot: true,
      compress: true,
      historyApiFallback: true
    },

    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

    performance: false // 关闭性能分析，提升速度
  };

  return config;
};