const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader');
const pxtorem = require('postcss-pxtorem');

module.exports = {
	// 配置文件
	reactScriptsVersion: "react-scripts",
	style: {
		postcss: {
			loaderOptions: {
				ident: 'postcss',
				plugins: [
					pxtorem({
						rootValue: 75,
						propList: [
							'*'
						],
						exclude: /node_modules/i // 过滤掉node_modules 文件夹下面的样式
					})
				]
			}
		}
	},
	webpack: {
		alias: {
			'@': path.resolve(__dirname, "src"),
		}
	},
	plugins: [
		{
			plugin: sassResourcesLoader,
			options: {
				resources: [
					'./src/assets/css/theme.scss'
				],
			},
		}
	],
	// 代理接口
	// devServer: {
	// 	port: 3001,
	// 	host: 'localhost',
	// 	proxy: {
	// 		'/api': {
	// 			target: `${hostUrl.replace(/"/g, '')}/api`,
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				"^/api": ''
	// 			}
	// 		}
	// 	},
	// }
}