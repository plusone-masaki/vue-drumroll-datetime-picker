import { computed, h } from 'vue'
import dayjs from '../modules/dayjs'
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

  setup (props, { emit }) {
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
