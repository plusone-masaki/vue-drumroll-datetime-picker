import { ScrollPicker } from 'vue-scroll-picker'
import dayjs from '../modules/dayjs'
import useSensitivity from '../mixins/useSensitivity'

export default {
  name: 'BasePicker',

  functional: true,

  mixins: [
    useSensitivity,
  ],

  props: {
    align: { type: String, default: 'center' },
    items: { type: Array, required: true },
    format: { type: String, required: true },
    height: { type: [String, Number], default: '10em' },
    unit: { type: String, required: true },
    value: { type: [String, Number], default: undefined },
  },

  render (h, { props, listeners }) {
    return h(ScrollPicker, {
      style: {
        '--picker-align': props.align,
        height: typeof props.height === 'string' ? props.height : props.height + 'px',
      },
      props: {
        options: props.items,
        dragSensitivity: props.dragSensitivity,
        touchSensitivity: props.touchSensitivity,
        scrollSensitivity: props.scrollSensitivity,
        value: dayjs(props.value, props.format).get(props.unit),
      },
      on: {
        input: value => {
          if (!value) value = 0

          const dateObj = props.value ? dayjs(props.value, props.format) : dayjs()
          const current = dateObj.get(props.unit)
          const date = dateObj.set(props.unit, value)

          // 桁上がり抑止
          if (current <= value && date.get(props.unit) < value) return
          listeners.input(date.unix())
        },
      },
    })
  },
}
