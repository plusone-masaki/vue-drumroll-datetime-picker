import * as dayjs from 'dayjs'
import datestring from '../assets/datestring'

export default {
  props: {
    defaultValue: { type: String, default: undefined },
    format: { type: String, default: undefined },
    value: { type: [String, Number, Date], default: undefined },
  },
  computed: {
    modelValue: {
      get () {
        return datestring(this.value, this.modelFormat, this.type)
      },
      set (value) {
        this.$emit('input', dayjs(value).format(this.modelFormat))
      },
    },
    modelFormat () {
      if (this.format) return this.format
      switch (this.type) {
        case 'datetime': return 'YYYY-MM-DD HH:mm'
        case 'date': return 'YYYY-MM-DD'
        case 'time': return 'HH:mm'
        default: throw new Error('Invalid property. "type" is only allow "datetime/date/time".')
      }
    },
  },
  methods: {
    onInput (value) {
      this.modelValue = datestring(value, this.modelFormat, this.type)
    },

    onNativeInput (event) {
      const value = datestring(event.target.value, this.modelFormat, this.type)
      if (value) this.modelValue = value
    },
  },
}
