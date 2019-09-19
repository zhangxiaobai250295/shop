module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {   // 请求路径以api开头的都代理到下面target设置的url去
        target: 'http://localhost:3000/web/xlmc',
        changeOrigin: true,  // 开启跨域
        pathRewrite: {  // 重写路径
          '^/api': ''  // 匹配到第一个以api开头的替换为空  不然的话请求的路径为：http://localhost:3000/web/xlmc/api/api/send_code
        }
      },
      '/pay': {
        target: 'http://47.98.157.152/WXPayProject/pay',
        changeOrigin: true,
        pathRewrite: {
          '^/pay': ''
        }
      }
    }
  }
};
