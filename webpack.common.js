const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

entry: './src/index.jsx',
plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        inject: false,
        template: require('html-webpack-template'),
        title: 'Cryptaur Crowdsale Platform',
        bodyHtmlSnippet: '<div id="container"></div>',
        lang: 'en-US',
        links: [
            {
                href: 'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900',
                rel: 'stylesheet'
            }
        ]
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
    })
],
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
},
module: {
    rules: [
    {
        test: /\.jsx/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
    },
    {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            'file-loader'
        ]
    },
    {
        test: /\.(csv|tsv)$/,
        use: [
            'csv-loader'
        ]
      }
    ]
}

}
