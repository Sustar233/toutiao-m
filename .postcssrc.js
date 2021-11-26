// postcss.config.js
module.exports = {
  // 配置要使用的 PostCss 插件
  plugins: {
    // 配置使用 postcss-pxtorem 插件
    'postcss-pxtorem': {
      // 我们的设计通稿是750，所以应该设置为750/10=75
      // 但是vant建议设置为37.5（因为vant是基于37.5写的
      // 如果是vant样式，则按照37.5转换，自己的则按照75
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的 CSS 属性
      // * 表示所有
      propList: ['*'],
    },
  },
}