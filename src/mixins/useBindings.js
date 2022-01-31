import dayjs from '../modules/dayjs'
import { calculatePattern, datestring } from '../modules/format-helper'

export default {
  props: {
    align: { type: String, default: 'right' },
    defaultValue: { type: String, default: undefined },
    pattern: { type: Object, default: undefined },
    format: { type: [String, Object], default: undefined },
    value: { type: [String, Number, Date], default: undefined },
  },
  computed: {
    modelValue: {
      get () {
        const modelValue = this.value || this.defaultValue || dayjs().format(this.modelFormat)
        return datestring(modelValue, this.modelFormat, this.type)
      },
      set (value) {
        const valueObj = dayjs(value, this.format)
        if (this.minDate && valueObj.isBefore(this.minDate)) value = this.minDate
        if (this.maxDate && valueObj.isAfter(this.maxDate)) value = this.maxDate

        this.$emit('input', value)
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
    drumPattern () {
      return {
        ...calculatePattern(this.modelFormat),
        ...(this.pattern || {}),
      }
    },
  },
  methods: {
    onInput (value) {
      if (dayjs.unix(value).isBefore(this.minDate)) {
        this.modelValue = datestring(this.minDate, this.modelFormat, this.type)
      } else if (this.maxDate && dayjs(value).isAfter(this.maxDate)) {
        this.modelValue = datestring(this.maxDate, this.modelFormat, this.type)
      } else {
        this.modelValue = datestring(value, this.modelFormat, this.type)
      }
    },

    onNativeInput (event) {
      const value = datestring(event.target.value, this.modelFormat, this.type)
      if (value) this.modelValue = value
    },
  },
}
