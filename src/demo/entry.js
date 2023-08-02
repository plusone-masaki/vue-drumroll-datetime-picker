import { createApp } from 'vue'
import Demo from './Demo.vue'
import { DateTimePicker, DatePicker, TimePicker } from '../main'

const app = createApp(Demo)
app.component('DateTimePicker', DateTimePicker)
app.component('DatePicker', DatePicker)
app.component('TimePicker', TimePicker)

window.vm = app
app.mount('#app')
