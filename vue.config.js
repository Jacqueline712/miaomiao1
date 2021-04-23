module.exports = {
	// publicPath:'/maizuo',
	devServer:{
		proxy:{
			// 代理本地接口要写在上面
			'/api3':{
				// 反向代理的目标
				target:'http://localhost:3000',
				// 反向代理的地址
				changeOrigin:true //是否跨域
			},
			// '/api':{
			// 	// 反向代理的目标
			// 	target:'http://39.97.33.178',
			// 	// 反向代理的地址
			// 	changeOrigin:true
			// },
			// 城市接口
			// '/ajax':{
			// 	// 反向代理的目标
			// 	target:'https://maoyan.com',
			// 	// 反向代理的地址
			// 	changeOrigin:true,
			// 	pathRewrite:{
			// 		'^ajax':'/ajax1'
			// 	}
			// },
			'/ajax':{
				// 反向代理的目标
				target:'https://m.maoyan.com',
				// 反向代理的地址
				changeOrigin:true
			},
			
			// 详情页
			'/asgard':{
				// 反向代理的目标
				target:'https://m.maoyan.com',
				// 反向代理的地址
				changeOrigin:true
			},
			'/films':{
				// 反向代理的目标
				target:'https://m.maoyan.com',
				// 反向代理的地址
				changeOrigin:true
			}
		}
	}
}