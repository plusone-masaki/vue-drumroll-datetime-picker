import Vue from 'vue'
import dayjs from 'dayjs'
import Demo from './Demo'
import DateTimePicker from '../pickers/DateTimePicker'
import '../sass/vue-drumroll-datetime-picker.sass'

Vue.component('DateTimePicker', DateTimePicker)
Vue.prototype.$dayjs = dayjs

window.vm = new Vue({
  el: '#app',
  render: h => h(Demo),
})
