const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,  // 关闭语法检查
    // 开启代理服务器(方式一)
    /*devServer: {
        proxy: 'http://localhost:5000'
    }*/
    // 方式二
    /*devServer: {
        proxy: {
            '/api1': {
                target: 'http://localhost:5000',
                pathRewrite: {"^/api1": ''}, // 代理向后端服务器去掉/api1
                ws: true,   // 用于支持websocket
                changeOrigin: true  // 欺骗后端服务器 用于控制请求头中的host值
            },
            '/api2': {
                target: 'http://localhost:5001',
                pathRewrite: {"^/api2": ''}, // 代理向后端服务器去掉/api2
                ws: true,   // 用于支持websocket
                changeOrigin: true  // 欺骗后端服务器 用于控制请求头中的host值
            }
        }
    }*/
})
/*
* changeOrigin设置为true时，服务器收到的请求头中的host为：localhost：5000
* changeOrigin设置为false时，服务器收到的请求头中的host为：localhost：8080
* changeOrigin默认值为true
* */
