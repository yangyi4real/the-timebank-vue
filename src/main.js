// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SL from './common/SaiLei'
import HTTPDatas from './common/HTTPDatas'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'

Vue.config.productionTip = false
Vue.prototype.$SaiLei = SL
Vue.prototype.$_HTTPDatas = HTTPDatas
Vue.use(YDUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
