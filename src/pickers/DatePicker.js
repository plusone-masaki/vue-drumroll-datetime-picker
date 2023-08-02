import { computed, h } from 'vue'
import dayjs from '../modules/dayjs'
import * as constants from '../assets/constants'
import useProvide from '../composables/useProvide'
import useDialog from '../composables/useDialog'
import PickerContainer from '../components/PickerContainer'
import { calculatePattern, datestring, guessDateOrder } from '../modules/format-helper'
import BaseDatePicker from './BaseDatePicker'
import useDateLists from '../composables/useDateLists'
import DrumDivider from '../components/DrumDivider'

const DatePicker = {
  props: {
    dateOrder: { type: Array, default: undefined },
    height: { type: [String, Number], default: undefined },
    dialog: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    hideButton: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    separator: { type: String, default: undefined }, // deprecated
    align: { type: String, default: 'right' },
    defaultValue: { type: String, default: undefined },
    pattern: { type: Object, default: undefined },
    format: { type: [String, Object], default: undefined },
    modelValue: { type: [String, Number, Date], default: undefined },
  },

  setup: (props, context) => {
    useProvide(props)
    const drumPattern = computed(() => ({
      ...calculatePattern(props.format || 'YYYY-MM-DD'),
      ...(props.pattern || {}),
    }))

    const { years, months, days } = useDateLists(props, drumPattern)
    const { generateDialogPicker } = useDialog('date', props, context)

    const onInput = (value) => {
      if (dayjs.unix(value).isBefore(props.minDate)) {
        context.emit('update:modelValue', datestring(props.minDate, 'YYYY-MM-DD', 'date'))
      } else if (props.maxDate && dayjs(value).isAfter(props.maxDate)) {
        context.emit('update:modelValue', datestring(props.maxDate, 'YYYY-MM-DD', 'date'))
      } else {
        context.emit('update:modelValue', datestring(value, 'YYYY-MM-DD', 'date'))
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
      const dateOrder = props.dateOrder || guessDateOrder(props.format || 'YYYY-MM-DD')
      dateOrder.forEach((unit, index) => {
        const options = {
          defaultValue: props.defaultValue,
          maxDate: props.maxDate,
          minDate: props.minDate,
          modelValue: props.modelValue,
          format: props.format || 'YYYY-MM-DD',
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
      return () => h(
        'div',
        { class: ['v-drumroll-picker'] },
        [container],
      )
    }
  },
}

export default DatePicker
