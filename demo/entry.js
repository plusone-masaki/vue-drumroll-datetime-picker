import Vue from 'vue'
import dayjs from 'dayjs'
import App from './App'
import DateTimePicker from '../src/pickers/DateTimePicker'
import '../src/sass/vue-drumroll-datetime-picker.sass'

Vue.component('DateTimePicker', DateTimePicker)
Vue.prototype.$dayjs = dayjs

window.vm = new Vue({
  el: '#app',
  render: h => h(App),
})
