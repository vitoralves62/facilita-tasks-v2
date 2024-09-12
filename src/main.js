import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  pinia,
  router,
  render: h => h(App),
}).$mount('#app')
