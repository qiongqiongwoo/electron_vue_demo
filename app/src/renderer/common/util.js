const crypto = require('crypto')
// const url = require('url')
const md5 = function (text) {
  return crypto.createHash('md5').update(text).digest('hex')
}
const resetCookie = function (desUrl, session) {
  session.defaultSession.cookies.get({domain: 'localhost'}, function (error, cookies) {
    error && console.log(error)
    cookies.forEach(function (item) {
      const cookie = { url: desUrl, name: item.name, value: item.value }
      session.defaultSession.cookies.set(cookie, function (error) {
        if (error) console.error(error)
      })
    })
  })
}
const saveCookie = function (desUrl, name, loginInfo, session, resFunc) {
  const cookie = { url: desUrl, name: name, value: JSON.stringify(loginInfo) }
  session.defaultSession.cookies.set(cookie, function (error) {
    if (error) console.error(error)
    resFunc && resFunc()
  })
}
const getCookie = function (desUrl, session, name, resFunc) {
  session.defaultSession.cookies.get({ url: desUrl }, function (error, cookies) {
    error && console.log(error)
    let loginInfo = cookies.filter((x) => x.name === name)[0]
    loginInfo = (!loginInfo || loginInfo === '') ? {} : JSON.parse(loginInfo.value)
    resFunc && resFunc(loginInfo)
  })
}

export {
  resetCookie,
  saveCookie,
  getCookie,
  md5
}
