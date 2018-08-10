import { md5, saveCookie, resetCookie } from '@/common/util'
import { remote, ipcRenderer } from 'electron'
import HeaderBar from 'views/headerBar/headerBar'
const config = require('@/../../../config.js')
const session = remote.session
const loginData = {
  components: {
    HeaderBar
  },
  data () {
    return this.getResetData()
  },
  methods: {
    render: () => {},
    getResetData () {
      let loginInfo = { comid: '', account: '', password: '', autoLogin: false, savePwd: false }
      return {
        isLogin: false,
        showMes: '',
        showCheck: false,
        login: loginInfo,
        loading: false,
        loginUrl: process.env.NODE_ENV !== 'development' ? (window.localStorage.channelValue ? window.localStorage.channelValue : config.mainHost) + config.loginRefUrl : config.loginRefUrl,
        directUrl: window.localStorage.channelValue || config.mainHost,
      }
    },
    inputFocus (event) {
      event.target.select()
      this.checkMes = ''
      this.showMes = false
    },
    accObjFocus () {
      this.$refs['accObj'].focus()
    },
    passObjFocus () {
      this.$refs['passObj'].focus()
    },
    validate () {
      if (this.login.comid === '') {
        this.showMsg('请输入公司ID')
        return false
      }
      if (this.login.account === '') {
        this.showMsg('请输入用户名')
        return false
      }
      if (this.login.password === '') {
        this.showMsg('请输入密码')
        return false
      }
      this.loading = true
      this.handleLogin()
    },
    openWebApp () {
      this.$router.push({ path: '/home' })
      remote.getCurrentWindow().maximize()
    },
    checkLogin () {
      let loginInfo = (window.localStorage || {})[this.directUrl]
      if (loginInfo) {
        loginInfo = JSON.parse(loginInfo)
        console.log(loginInfo)
      }
      this.login = Object.assign(this.login, loginInfo)
      let isAutoLogin = (this.login || {}).autoLogin
      isAutoLogin && this.handleLogin()
      !isAutoLogin && this.render()
    },
    showMsg (msg, type = 'error') {
      // this.checkMes = '请输入用户名'
      // this.showMes = true
      this.$Message[type]({
        top: '200px',
        duration: 4,
        content: msg || '登录信息错误，请重新输入！'
      })
    },
    handleLogin () {
      let req = {
        req: JSON.stringify({
          group_id: this.login.comid,
          user_name: this.login.account,
          password: md5(this.login.password)
        }),
        app_info: JSON.stringify({
          from: 'pc_client'
        })
      }
      this.$http.post(this.loginUrl + '?gid=0&logid=' + Math.round(new Date().getTime() / 1000), req).then((response) => {
        this.loading = false
        if (response.data.errno === 0) {
          config.isDev && resetCookie(this.directUrl, session)
          // 勾选保存密码或自动登录
          if (this.login.autoLogin || this.login.savePwd) {
            saveCookie(this.directUrl, 'loginInfo', this.login, session)
            window.localStorage[this.directUrl] = JSON.stringify(this.login)
          }
          this.openWebApp()
        } else {
          this.showMsg('公司ID，账号或密码错误')
        }
      }, (response) => {
        this.showMsg('公司ID，账号或密码错误')
      })
    },
    forgetPwd () {
      this.$Message.info({
        top: '200px',
        duration: 5,
        content: '请联系系统管理员重置密码!'
      })
    },
    reloadLogin(data) {
      this.$nextTick(() => {
        let sta = this.getResetData()
        Object.keys(sta).forEach((x) => this[x] = sta[x])
      })
    }
  },
  watch: {
    '$route' () {
      if (this.$route.name === 'login') {
        this.checkLogin()
      }
    }
  },
  created () {
    this.checkLogin()
    if (config.clearLocalStorage) {
      window.localstorage.channelValue = null
    }
  },
  mounted () {
    ipcRenderer.send('checkForUpdate')
  }
}
export {
  loginData
}

