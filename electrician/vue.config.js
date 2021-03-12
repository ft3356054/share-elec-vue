// const path = require('path')

// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
// // const SdSentryWebpackPlugin = require('@sd/monitor/plugin/sentry')
// // const gitVersion = require('child_process').execSync('git rev-parse --short HEAD')
// const publicPath = process.env.NODE_ENV === 'development'
//                     ? `http://localhost:8083`  //测试的接口
//                     : './'   //生产的接口
// module.exports = {
//   publicPath,
//   productionSourceMap: true, // 开发环境默认为true , 打包生产代码前设置为false
//   devServer: {
//     host: 'localhost',
//     port: 8080,
//     https: true,
//     http2: true,
//     proxy: 'http://localhost:8083',
//     overlay: {   //去除eslint报警告
//       warnings: true,
//       errors: true
//     },
//     disableHostCheck: true,
//     compress: true
//   },
//   css: { // 配置css模块
//     loaderOptions: { // 向预处理器 Loader 传递配置选项
//       less: { // 配置less（其他样式解析用法一致）
//         javascriptEnabled: true // 设置为true
//       }
//     }
//   },
//   chainWebpack: config => {
//     config.resolve.alias
//       .set('public', resolve('public'))
//       .set('src', resolve('src'))
//       .set('views', resolve('src/views'))
//       .set('components', resolve('src/components'))
//       .set('assets', resolve('src/assets'))
//       .set('utils', resolve('src/utils'))
//       .set('config', resolve('src/config'))
//     config.output
//       .filename('[name].[hash].js')
//       .chunkFilename('js/[name].[contenthash:8].js')
//   },
//   configureWebpack: {
//     plugins: [
//       // new SdSentryWebpackPlugin({
//       //   key: '5d1e1ef99c1142a3b6069976e4fcdfbe', // sentry上报key
//       //   project: '582', // sentry上报project
//       //   environment: process.env.NODE_ENV,
//       //   release: String(gitVersion).trim(),
//       //   sourcemap: {
//       //     configFile: '.sentryclirc',
//       //     include: './dist/',
//       //     urlPrefix: publicPath, // 静态资源地址
//       //     ignore: ['node_modules']
//       //   }
//       // })
//     ]
//   },
// }


const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "http://localhost:8083" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
      .set("@s", resolve("src/service")); /* 别名配置 */
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    proxy: 'http://localhost:8083'
  }
};

  

      // module.exports = {
      //   devServer: {
      //     proxy: 'http://localhost:8083'
      //   }
      // }