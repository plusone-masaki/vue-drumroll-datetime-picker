import Vue from 'vue'
import dayjs from 'dayjs'
import Demo from './Demo'
import { DateTimePicker, DatePicker, TimePicker } from '../main'

Vue.component('DateTimePicker', DateTimePicker)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.prototype.$dayjs = dayjs

window.vm = new Vue({
  el: '#app',
  render: h => h(Demo),
})
