import { computed, h } from 'vue'
import { calculatePattern, datestring } from '../modules/format-helper'
import BaseTimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import useDialog from '../composables/useDialog'
import useProvide from '../composables/useProvide'
import { useTimeLists } from '../composables/useDateTimeLists'
import DrumDivider from '../components/DrumDivider'

const TimePicker = {
  props: {
    align: { type: String, default: 'right' },
    defaultValue: { type: String, default: undefined },
    dialog: { type: Boolean, default: false },
    format: { type: [String, Object], default: 'HH:mm' },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    minuteInterval: { type: [String, Number], default: 1 },
    modelValue: { type: [String, Number, Date], default: undefined },
    pattern: { type: Object, default: undefined },
  },

  setup (props, context) {
    useProvide(props)
    const drumPattern = computed(() => ({
      ...calculatePattern(props.format),
      ...(props.pattern || {}),
    }))
    const { hours, minutes } = useTimeLists(props, drumPattern)
    const { generateDialogPicker } = useDialog('time', props, context)

    const onInput = (value) => {
      context.emit('update:modelValue', datestring(value, props.format, 'time'))
    }

    const pickers = () => {
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
          format: props.format,
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

    if (props.dialog) {
      return generateDialogPicker(pickers)
    } else {
      const container = h(PickerContainer, pickers)
      return () => h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}

export default TimePicker
