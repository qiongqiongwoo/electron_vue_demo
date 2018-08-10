import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

// import Vue from 'vue'
// import Vuex from 'vuex'

// import modules from './modules'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules,
//   strict: process.env.NODE_ENV !== 'production'
// })
