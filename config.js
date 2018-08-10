/*
 * 当前app的配置信息
 */
module.exports = {
  port: 8088,
  isDev: process.env.NODE_ENV === 'development',
  // 转接地址
  mainHost: 'http://t800.chemanman.com',
  // 登录后跳转的url
  loginRefUrl: '/api/Login/Login/login',
  // 清空本地缓存
  clearLocalStorage: false
}
