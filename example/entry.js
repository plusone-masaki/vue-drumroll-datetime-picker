import Vue from 'vue'
import App from './App'

window.vm = new Vue({
  el: '#app',
  render: h => h(App),
})
