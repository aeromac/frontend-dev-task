const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/js/main.js',
   output: {
      path: path.join(__dirname, '/'),
      filename: 'app.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      port: 8001,
      contentBase: "./",
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         },
         { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
         {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'img/[hash]-[name].[ext]',
                },
              },
            ],
          }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ],
   resolve: {
     extensions: ['.js', '.css']
   }
}