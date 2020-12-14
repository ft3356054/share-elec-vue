module.exports = {
    plugins: {
      'autoprefixer': { //补全浏览器内核
        env:process.env.NODE_ENV
      },
      'postcss-pxtorem': {
        rootValue: 16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
        selectorBlackList: [], // 忽略转换正则匹配项
        propList: ['*']
      }
    }
  }

  // plugins: {
  //   'autoprefixer': {
  //     browsers: ['Android >= 4.0', 'iOS >= 7']
  //   },
