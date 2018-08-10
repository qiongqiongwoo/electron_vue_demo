import HeaderBar from '@/views/headerBar/headerBar'
const config = require('@/../../../config.js')
const webViewData = {
  data () {
    return {
      src: window.localStorage.channelValue || config.mainHost
    }
  },
  components: {
    HeaderBar
  },
  mounted () {
    const myWebView = document.getElementById('my-webview')
    myWebView.addEventListener('new-window', (e) => {
      const protocol = require('url').parse(e.url).protocol
      if (protocol === 'https:' || protocol === 'http:') {
        window.open(e.url, '', 'frame=true,autoHideMenuBar=true')
      }
    })
  }
}
export {
  webViewData
}