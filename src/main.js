// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import SL from './common/SaiLei'
import HTTPData from './common/HTTPDatas'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'
import TipsTools from './common/TipsTools'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$SaiLei = SL
Vue.prototype.$_lib = new TipsTools()
Vue.prototype.$_HTTPDatas = HTTPData
Vue.use(YDUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
