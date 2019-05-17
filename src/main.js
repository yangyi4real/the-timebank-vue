// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import SL from './common/SaiLei'
import store from './store/Store'
import LibTools from './common/TipsTools'
import HTTPData from './common/HTTPDatas'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'

Vue.config.productionTip = false
Vue.config.devtool = true
Vue.prototype.$axios = Axios
Vue.prototype.$host = new HTTPData().host
Vue.prototype.$SaiLei = new SL()
Vue.prototype.$_lib = new LibTools()
Vue.prototype.$_HTTPData = new HTTPData()
Vue.use(YDUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
