module.exports = {
	devServer:{
		proxy:{
			'/api':{
				// 反向代理的目标
				target:'http://39.97.33.178',
				// 反向代理的地址
				changeOrigin:true
			}
		}
	}
}