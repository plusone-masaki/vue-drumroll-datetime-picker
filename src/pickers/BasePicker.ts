import { h } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import useDayJS from '../composables/useDayJS'

const BasePicker = {
  name: 'BasePicker',
  props: {
    dragSensitivity: { type: [String, Number], default: 1.7 },
    height: { type: [String, Number], default: '10em' },
    format: { type: [String, Object], required: true },
    items: { type: Array, required: true },
    modelValue: { type: [String, Number, Date], default: undefined },
    scrollSensitivity: { type: [String, Number], default: 1.0 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
    unit: { type: String, required: true },
  },

  setup: (props, { emit }) => {
    const dayjs = useDayJS()

    return () => h(VueScrollPicker, {
      style: {
        height: typeof props.height === 'string' ? props.height : props.height + 'px',
      },
      options: props.items,
      dragSensitivity: props.dragSensitivity,
      touchSensitivity: props.touchSensitivity,
      scrollSensitivity: props.scrollSensitivity,
      modelValue: (
        typeof props.modelValue === 'string'
          ? dayjs(props.modelValue, props.format)
          : dayjs(props.modelValue)
      ).get(props.unit),
      'onUpdate:modelValue': value => {
        if (Number.isNaN(value)) return

        const dateObj = props.modelValue ? dayjs(props.modelValue, props.format) : dayjs()
        const current = dateObj.get(props.unit)
        const date = dateObj.set(props.unit, value)

        // 桁上がり抑止
        if (current <= value && date.get(props.unit) < value) return
        emit('update:modelValue', date.unix())
      },
    })
  },
}

export default BasePicker
