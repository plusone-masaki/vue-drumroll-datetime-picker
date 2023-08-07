import typeofDayJS from 'dayjs'
import { h, inject } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import useDayJS from '../composables/useDayJS'

const BasePicker = {
  name: 'BasePicker',
  props: {
    items: { type: Array, required: true },
    height: { type: [String, Number], default: '10em' },
    format: { type: [String, Object], required: true },
    unit: { type: typeofDayJS.UnitType, required: true },
    modelValue: { type: [String, Number], default: undefined },
  },

  setup: async (props, { emit }) => {
    const dayjs = await useDayJS(props.locale)
    const dragSensitivity = inject('dragSensitivity')
    const touchSensitivity = inject('touchSensitivity')
    const scrollSensitivity = inject('scrollSensitivity')
    const align = inject('align')

    return () => h(VueScrollPicker, {
      style: {
        '--picker-align': align,
        height: typeof props.height === 'string' ? props.height : props.height + 'px',
      },
      options: props.items,
      dragSensitivity,
      touchSensitivity,
      scrollSensitivity,
      modelValue: dayjs(props.modelValue, props.format).get(props.unit),
      'onUpdate:modelValue': value => {
        if (!value) value = 0

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
