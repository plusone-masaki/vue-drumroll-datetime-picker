import { ScrollPicker } from 'vue-scroll-picker'
import dayjs from 'dayjs'

export default {
  name: 'BasePicker',

  functional: true,

  props: {
    items: { type: Array, required: true },
    format: { type: String, required: true },
    dragSensitivity: { type: [String, Number], required: true },
    touchSensitivity: { type: [String, Number], required: true },
    scrollSensitivity: { type: [String, Number], required: true },
    unit: { type: String, required: true },
    value: { type: [String, Number], required: true },
    width: { type: [String, Number], default: '2em' },
  },

  render (h, context) {
    return h(ScrollPicker, {
      style: { width: typeof context.props.width === 'string' ? context.props.width : context.props.width + 'px' },
      props: {
        options: context.props.items,
        dragSensitivity: context.props.dragSensitivity,
        touchSensitivity: context.props.touchSensitivity,
        scrollSensitivity: context.props.scrollSensitivity,
        value: dayjs(context.props.value).get(context.props.unit),
      },
      on: {
        input: value => {
          const { props } = context
          const day = dayjs(props.value)
          const current = day.get(props.unit)
          const date = day.set(props.unit, value)

          // 桁上がり抑止
          if (current <= value && date.get(props.unit) < value) return
          context.listeners.input(date.format(props.format))
        },
      },
    })
  },
}
