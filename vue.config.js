// vue.config.js
module.exports = {

  publicPath: process.env.NODE_ENV === 'production' ? '/check-holdings/' : '/',

  devServer: {
    proxy: 'http://localhost:3000'
  }
}
