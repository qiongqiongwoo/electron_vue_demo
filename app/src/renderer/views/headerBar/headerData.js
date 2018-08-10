import { remote, ipcRenderer } from 'electron'
const headerData = {
  data () {
    return {
      currWindow: remote.getCurrentWindow(),
      settingModel: false,
      autoUpdater: false,
      channelValue: window.localStorage.channelValue || 'http://t800.chemanman.com',
      updateMessage: '正在检查更新...',
      downloadText: '系统下载更新中...',
      closeClick: 'close',
      isMaximized: false,
      updateAve: false,
      updaterLoading: false,
      updateDownloadFinish: false,
      downloadModal: false,
      checkFromHeader: false,
      spanDiv: true,
      latency: 10 // 启动的时候给网络延迟设置默认值
    }
  },
  methods: {
    refresh () { // 页面刷新
      const webView = document.querySelector('webview')
      webView && webView.reload()
      this.$emit('child-refresh', true)
    },
    minimize () { // 最小化
      this.currWindow.minimize()
    },
    maximize () { // 最大化
      if (this.currWindow.isMaximized()) {
        this.currWindow.unmaximize()
        this.isMaximized = false
      } else {
        this.currWindow.maximize()
        this.isMaximized = true
      }
    },
    close () { // 关闭应用程序
      if (this.closeClick === 'close') {
        ipcRenderer.send('quitApp')
      } else {
        this.currWindow.minimize()
      }
    },
    setting () { // 设置弹窗
      this.settingModel = true
    },
    saveSetting () {
      window.localStorage.closeClick = this.closeClick
      window.localStorage.channelValue = this.channelValue
    },
    cancelSetting () {
      console.log('close click')
    },
    checkUpdate () {
      ipcRenderer.send('checkForUpdate')
      // 关闭设置弹窗
      this.settingModel = false
      this.checkFromHeader = true
    },
    cancelUpdate () {
      ipcRenderer.send('quitApp')
    },
    confirmUpdate () {
      if (this.updateAve) {
        ipcRenderer.send('downloadNewApp')
        this.updaterLoading = true
        this.downloadModal = true
      }
    },
    confirmInstall () {
      if (this.updateDownloadFinish) {
        ipcRenderer.send('isUpdateNow')
      }
    }
  },
  created () {
    setInterval(() => { // 获取网络延迟
      const ls = require('child_process').spawn('ping', ['yundan.chemanman.com', '-n', 1])
      const iconv = require('iconv-lite')
      let allMsg = ''
      let that = this
      ls.stdout.on('data', function (data) {
        var msg = iconv.decode(data, 'gbk')
        allMsg += msg
      })

      ls.stdout.on('end', function () {
        let msgArr = allMsg.split('TTL')
        if (msgArr.length > 1) { // 网络正常
          const speed = msgArr[0].split('=').pop()
          const speedNum = speed.split('ms')[0]
          that.latency = speedNum
        } else { // 网络不正常
          that.latency = 0
        }
      })
    }, 2000)
    ipcRenderer.on('message', (event, msg) => {
      if (!this.checkFromHeader && (msg.key === 'updateNotAva' || msg.key === 'updateChecking' || msg.key === 'updateErr')) {
        this.autoUpdater = false
      } else {
        this.autoUpdater = true
      }
      this.updateMessage = msg.msg
      if (msg.key === 'updateAva') {
        this.updateAve = true
      }
    })
    ipcRenderer.on('isUpdateNow', (event, text) => {
      this.downloadText = '下载更新完成, 点击确定进行安装'
      this.updateDownloadFinish = true
      let elems = document.getElementsByClassName('spin-div')
      elems[0].parentElement.removeChild(elems[0])
    })
  },
  mounted () {
    // 获取设置
    var _this = this
    _this.closeClick = window.localStorage.closeClick || _this.closeClick
    _this.channelValue = window.localStorage.channelValue || _this.channelValue
  }
}
export {
  headerData
}
