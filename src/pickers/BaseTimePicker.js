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

  setup: async (props, { emit }) => {
    const dayjs = await useDayJS(props.locale)
    const formatDefaultValue = computed(() => dayjs(props.defaultValue).format(props.format))

    const onInput = (value) => {
      if (value && (props.modelValue || dayjs.unix(value).format(props.format) !== formatDefaultValue.value)) {
        emit('update:modelValue', dayjs.unix(value).format(props.format))
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
