import { computed, h } from 'vue'
import * as constants from '../assets/constants'
import { calculatePattern, dateFormat, datestring, guessDateOrder } from '../modules/format-helper'
import useDialog from '../composables/useDialog'
import useProvide from '../composables/useProvide'
import { useDateLists, useTimeLists } from '../composables/useDateTimeLists'
import useDayJS from '../composables/useDayJS'
import DrumDivider from '../components/DrumDivider'
import PickerContainer from '../components/PickerContainer'
import BaseDatePicker from './BaseDatePicker'
import BaseTimePicker from './BaseTimePicker'

const DateTimePicker = {
  name: 'DateTimePicker',

  props: {
    align: { type: String, default: 'right' },
    dateOrder: { type: Array, default: undefined },
    defaultValue: { type: String, default: undefined },
    dialog: { type: Boolean, default: false },
    format: { type: [String, Object], default: undefined },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
    modelValue: { type: [String, Number, Date], default: undefined },
    pattern: { type: Object, default: undefined },
    type: { type: String, default: 'datetime' }, // datetime, date, time
    locale: { type: String, default: undefined },
  },

  setup: async (props, context) => {
    useProvide(props)
    const dayjs = await useDayJS(props.locale)

    const modelFormat = computed(() => dateFormat(props.type, props.format))
    const drumPattern = computed(() => ({
      ...calculatePattern(modelFormat.value),
      ...(props.pattern || {}),
    }))

    const { years, months, days } = useDateLists(props, drumPattern)
    const { hours, minutes } = useTimeLists(props, drumPattern)
    const { generateDialogPicker } = useDialog(props.type, props, context)

    const onInput = (value) => {
      if (dayjs(datestring(value, modelFormat.value, props.type)).isBefore(props.minDate)) {
        context.emit('update:modelValue', datestring(props.minDate, modelFormat.value, props.type))
      } else if (props.maxDate && dayjs(value, modelFormat.value).isAfter(props.maxDate)) {
        context.emit('update:modelValue', datestring(props.maxDate, modelFormat.value, props.type))
      } else {
        context.emit('update:modelValue', datestring(value, modelFormat.value, props.type))
      }
    }

    const generateDatePicker = () => {
      const divider = drumPattern.value.dividerDate || drumPattern.value['divider-date']
      const drumDivider = divider ? h(DrumDivider, { divider }) : null
      const items = {
        year: years.value,
        month: months.value,
        date: days.value,
      }

      const pickers = []
      const dateOrder = props.dateOrder || guessDateOrder(modelFormat.value)
      dateOrder.forEach((unit, index) => {
        const options = {
          defaultValue: props.defaultValue,
          maxDate: props.maxDate,
          minDate: props.minDate,
          modelValue: props.modelValue,
          format: modelFormat.value,
          items: items[unit],
          unit,
          'onUpdate:modelValue': onInput,
        }
        pickers.push(h(BaseDatePicker, options))
        if (divider && index < dateOrder.length - 1) pickers.push(drumDivider)
      })

      return h('div', { class: 'v-drumroll-picker__group' }, [pickers])
    }

    const generateTimePicker = () => {
      const divider = drumPattern.value.dividerTime || drumPattern.value['divider-time']
      const drumDivider = divider ? h(DrumDivider, { divider }) : null
      const items = {
        hour: hours.value,
        minute: minutes.value,
      }

      const pickers = []
      const timeOrder = ['hour', 'minute']
      timeOrder.forEach((unit, index) => {
        const options = {
          defaultValue: props.defaultValue,
          modelValue: props.modelValue,
          format: modelFormat.value,
          drumPattern,
          items: items[unit],
          unit,
          'onUpdate:modelValue': onInput,
        }
        pickers.push(h(BaseTimePicker, options))
        if (divider && index < timeOrder.length - 1) pickers.push(drumDivider)
      })

      return h('div', { class: 'v-drumroll-picker__group' }, [pickers])
    }

    const pickers = () => {
      switch (props.type) {
        case 'datetime': return [generateDatePicker(), generateTimePicker()]
        case 'date': return [generateDatePicker()]
        case 'time': return [generateTimePicker()]
      }
    }

    if (props.dialog) {
      return generateDialogPicker(pickers)
    } else {
      const container = h(PickerContainer, { props }, pickers)
      return () => h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}

export default DateTimePicker
