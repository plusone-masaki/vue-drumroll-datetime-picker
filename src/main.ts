import { Plugin } from 'vue'
import './assets/sass/vue-drumroll-datetime-picker.sass'
import DateTimePicker from './pickers/DateTimePicker'
import DatePicker from './pickers/DatePicker'
import TimePicker from './pickers/TimePicker'

const plugin: Plugin = {
  install: (app) => {
    app.component('DateTimePicker', DateTimePicker)
    app.component('DatePicker', DatePicker)
    app.component('TimePicker', TimePicker)
  },
}

export default plugin
export {
  DateTimePicker,
  DatePicker,
  TimePicker,
}
