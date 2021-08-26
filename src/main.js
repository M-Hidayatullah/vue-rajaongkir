import Vue from 'vue'
import App from './App.vue'
import './index.css' // <-- Tailwind CSS

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

