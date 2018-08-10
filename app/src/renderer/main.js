import Vue from 'vue'
import iView from 'iview'
import CurrApp from './views/app/app'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.use(iView)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
// 设置为false 可以阻止在vue启动时生成生产提示
Vue.config.productionTip = false
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(CurrApp),
  created () {},
  method: {}
})
Vue.use({ vm })
