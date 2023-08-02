import { computed, h } from 'vue'
import * as constants from '../assets/constants'
import useDialog from '../mixins/useDialog'
import useProvide from '../composables/useProvide'
import PickerContainer from '../components/PickerContainer'
import BaseDatePicker from './BaseDatePicker'
import BaseTimePicker from './BaseTimePicker'
import dayjs from '../modules/dayjs'
import { datestring } from '../modules/format-helper'

const generateDatePicker = (options) => (
  h(BaseDatePicker, options())
)

const generateTimePicker = (options) => (
  h(BaseTimePicker, options())
)

const DateTimePicker = {
  name: 'DateTimePicker',

  mixins: [
    useDialog,
  ],

  props: {
    dateOrder: { type: Array, default: undefined },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
    type: { type: String, default: 'datetime' },
    align: { type: String, default: 'right' },
    defaultValue: { type: String, default: undefined },
    pattern: { type: Object, default: undefined },
    format: { type: [String, Object], default: undefined },
    modelValue: { type: [String, Number, Date], default: undefined },
  },

  setup (props, { emit }) {
    useProvide(props)

    const modelFormat = computed(() => {
      if (props.format) return props.format
      switch (props.type) {
        case 'datetime': return 'YYYY-MM-DD HH:mm'
        case 'date': return 'YYYY-MM-DD'
        case 'time': return 'HH:mm'
        default: throw new Error('Invalid property. "type" is only allow "datetime/date/time".')
      }
    })

    const onInput = (value) => {
      if (dayjs.unix(value).isBefore(props.minDate)) {
        emit('update:modelValue', datestring(props.minDate, modelFormat.value, props.type))
      } else if (props.maxDate && dayjs(value).isAfter(props.maxDate)) {
        emit('update:modelValue', datestring(props.maxDate, modelFormat.value, props.type))
      } else {
        emit('update:modelValue', datestring(value, modelFormat.value, props.type))
      }
    }

    const pickers = () => {
      const options = ops => ({
        props: {
          ...props,
          ...ops,
          modelValue: props.modelValue,
          format: props.modelFormat,
          drumPattern: props.drumPattern,
        },
        on: { 'update:modelValue': onInput },
      })

      switch (props.type) {
        case 'datetime': return [generateDatePicker(options), generateTimePicker(options)]
        case 'date': return [generateDatePicker(options)]
        case 'time': return [generateTimePicker(options)]
      }
    }

    if (props.dialog) {
      return this.generateDialogPicker()
    } else {
      const container = h(PickerContainer, { props }, [pickers()])
      return () => h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}

export default DateTimePicker
