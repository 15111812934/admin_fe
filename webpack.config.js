/*
* @Author: Aley
* @Date:   2018-03-17 21:53:17
* @Last Modified by:   Aley
* @Last Modified time: 2018-04-06 00:36:02
*/

const path              = require('path');
const webpack           = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  	entry: './src/app.jsx',
 	output: {
   	 	path: path.resolve(__dirname, 'dist'),
   	 	publicPath:'/dist/',
    	filename: 'js/app.js'
  	},
  	resolve:{
  		alias:{
  			page     :path.resolve(__dirname, 'src/page'),
  			component:path.resolve(__dirname, 'src/component'),
  			util     :path.resolve(__dirname, 'src/util'),
  			service  :path.resolve(__dirname, 'src/service')
  		}
  	},
  	module: {
		rules: [
		    // react语法的处理
		    {
		    	test: /\.jsx$/,
		    	exclude: /(node_modules)/,//对里面的文件不做处理
		    	use: {
		        	loader: 'babel-loader',
		        	options: {
		          	presets: ['env','react']
		        	}
		    	}
		 	},
		 	// css文件的处理
		 	{
        		test: /\.css$/,
        		use: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		})
      		},
      		// sass文件的处理
      		{
            	test: /\.scss$/,
            	use: [{
                	loader: "style-loader" // creates style nodes from JS strings
           		}, {
                	loader: "css-loader" // translates CSS into CommonJS
            	}, {
                	loader: "sass-loader" // compiles Sass to CSS
            	}]
            },
            // 字体图标图片的配置
            {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf|woff2|otf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'resource/[name].[ext]',
                    limit: 2000
                }
            }]
        },
        ]
	},
  	plugins: [
  		new HtmlWebpackPlugin({
  			template:'./src/index.html',
  			favicon:'./favicon.ico'
  		}),
  		new ExtractTextPlugin("css/[name].css"),
  		//提出公共模块
  		new webpack.optimize.CommonsChunkPlugin({
  			name:'common',
  			filename:'base.js'
  		})
  	],
  	devServer: {
     	port:8086,
     	// 路径的配置
        historyApiFallback: {
            index: '/dist/index.html'
        },
        //自动代理到后端的接口上
        proxy:{
			'/manage':{
				target:'http://admintest.happymmall.com',
				changeOrigin:true
			},
			'/user/logout.do':{
				target:'http://admintest.happymmall.com',
				changeOrigin:true
			}
        }
    },
};
module.exports = config;