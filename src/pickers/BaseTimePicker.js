import { computed, h } from 'vue'
import useDayJS from '../composables/useDayJS'
import BasePicker from './BasePicker'

const BaseTimePicker = {
  name: 'BaseTimePicker',
  props: {
    defaultValue: { type: String, default: undefined },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    modelValue: { type: [String, Number, Date], default: undefined },
    unit: { type: String, required: true }, // hour, minute
    items: { type: Array, required: true },
  },

  setup: (props, { emit }) => {
    const dayjs = useDayJS()
    const formatDefaultValue = computed(() => dayjs(props.defaultValue).format(props.format))

    const onInput = (value) => {
      const valueObj = dayjs.unix(value)
      if (value && (props.modelValue || valueObj.format(props.format) !== formatDefaultValue.value)) {
        emit('update:modelValue', value)
      }
    }

    return () => h(BasePicker, {
      ...props,
      modelValue: props.modelValue || props.defaultValue,
      'onUpdate:modelValue': onInput,
    })
  },
}

export default BaseTimePicker
