import { computed, defineComponent, h } from 'vue'
import { calculatePattern, datestring } from '../modules/format-helper'
import useDialog from '../composables/useDialog'
import { useTimeLists } from '../composables/useDateTimeLists'
import DrumDivider from '../components/DrumDivider'
import PickerContainer from '../components/PickerContainer'
import BasePicker from './BasePicker'

const TimePicker = defineComponent({
  props: {
    defaultValue: { type: String, default: undefined },
    dialog: { type: Boolean, default: false },
    dragSensitivity: { type: [String, Number], default: 1.7 },
    format: { type: String, default: 'HH:mm' },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    minuteInterval: { type: [String, Number], default: 1 },
    modelValue: { type: [String, Number, Date], default: undefined },
    pattern: { type: Object, default: undefined },
    locale: { type: String, default: undefined },
    scrollSensitivity: { type: [String, Number], default: 1.0 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
  },

  setup: (props, context) => {
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
          dragSensitivity: props.dragSensitivity,
          format: props.format,
          height: props.height,
          items: items[unit],
          modelValue: props.modelValue,
          scrollSensitivity: props.scrollSensitivity,
          touchSensitivity: props.touchSensitivity,
          unit,
          'onUpdate:modelValue': onInput,
        }
        pickers.push(h(BasePicker, options))
        if (divider && index < timeOrder.length - 1) pickers.push(drumDivider)
      })

      return h('div', { class: 'v-drumroll-picker__group' }, [pickers])
    }

    return () => {
      if (props.dialog) {
        return generateDialogPicker(pickers)
      } else {
        const container = h(PickerContainer, props, pickers)
        return h('div', { class: ['v-drumroll-picker'] }, [container])
      }
    }
  },
})

export default TimePicker
