module.exports = {
  dev:{
    assetsSubDirectory:"static",
    assetsPublicPath:"/",
    proxyTable:{
      '/api': {
        target: 'http://localhost:8083', //开发环境,设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0.0.0:3000/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      }
    }
  }
}