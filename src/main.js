import Vue from 'vue'
import App from './App.vue'
import router from './kRouter'
import store from './kStore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
