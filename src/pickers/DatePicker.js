import { computed, h } from 'vue'
import * as constants from '../assets/constants'
import { calculatePattern, datestring, guessDateOrder } from '../modules/format-helper'
import useProvide from '../composables/useProvide'
import useDialog from '../composables/useDialog'
import { useDateLists } from '../composables/useDateTimeLists'
import useDayJS from '../composables/useDayJS'
import DrumDivider from '../components/DrumDivider'
import PickerContainer from '../components/PickerContainer'
import BaseDatePicker from './BaseDatePicker'

const DatePicker = {
  props: {
    align: { type: String, default: 'right' },
    dateOrder: { type: Array, default: undefined },
    defaultValue: { type: String, default: undefined },
    dialog: { type: Boolean, default: false },
    format: { type: [String, Object], default: 'YYYY-MM-DD' },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    modelValue: { type: [String, Number, Date], default: undefined },
    pattern: { type: Object, default: undefined },
    locale: { type: String, default: undefined },
  },

  setup: (props, context) => {
    useProvide(props)
    const dayjs = useDayJS()
    const drumPattern = computed(() => ({
      ...calculatePattern(props.format),
      ...(props.pattern || {}),
    }))

    const { years, months, days } = useDateLists(props, drumPattern)
    const { generateDialogPicker } = useDialog('date', props, context)

    const onInput = (value) => {
      if (dayjs.unix(value).isBefore(props.minDate)) {
        context.emit('update:modelValue', datestring(props.minDate, props.format, 'date'))
      } else if (props.maxDate && dayjs(value, props.format).isAfter(props.maxDate)) {
        context.emit('update:modelValue', datestring(props.maxDate, props.format, 'date'))
      } else {
        context.emit('update:modelValue', datestring(value, props.format, 'date'))
      }
    }

    const pickers = () => {
      const divider = drumPattern.value.dividerDate || drumPattern.value['divider-date']
      const drumDivider = divider ? h(DrumDivider, { divider }) : null
      const items = {
        year: years.value,
        month: months.value,
        date: days.value,
      }

      const pickers = []
      const dateOrder = props.dateOrder || guessDateOrder(props.format)
      dateOrder.forEach((unit, index) => {
        const options = {
          defaultValue: props.defaultValue,
          maxDate: props.maxDate,
          minDate: props.minDate,
          modelValue: props.modelValue,
          format: props.format,
          'onUpdate:modelValue': onInput,
          items: items[unit],
          unit,
        }
        pickers.push(h(BaseDatePicker, options))
        if (divider && index < dateOrder.length - 1) pickers.push(drumDivider)
      })

      return h('div', { class: 'v-drumroll-picker__group' }, [pickers])
    }

    if (props.dialog) {
      return generateDialogPicker(pickers)
    } else {
      const container = h(PickerContainer, pickers)
      return () => h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}

export default DatePicker
