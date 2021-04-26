import { ScrollPicker } from 'vue-scroll-picker'
import dayjs from 'dayjs'
import useSensitivity from '@/mixins/useSensitivity'

export default {
  name: 'BasePicker',

  functional: true,

  mixins: [
    useSensitivity,
  ],

  props: {
    items: { type: Array, required: true },
    format: { type: String, required: true },
    height: { type: [String, Number], default: '10em' },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], required: true },
    unit: { type: String, required: true },
    value: { type: [String, Number], required: true },
    width: { type: [String, Number], default: '2em' },
  },

  render (h, { props, listeners }) {
    return h(ScrollPicker, {
      style: {
        height: typeof props.height === 'string' ? props.height : props.height + 'px',
        width: typeof props.width === 'string' ? props.width : props.width + 'px',
      },
      props: {
        options: props.items,
        dragSensitivity: props.dragSensitivity,
        touchSensitivity: props.touchSensitivity,
        scrollSensitivity: props.scrollSensitivity,
        value: dayjs(props.value).get(props.unit),
      },
      on: {
        input: value => {
          const day = dayjs(props.value, props.format)
          const current = day.get(props.unit)
          const date = day.set(props.unit, value)

          // 桁上がり抑止
          if (current <= value && date.get(props.unit) < value) return

          listeners.input(date.format(props.format))
        },
      },
    })
  },
}
