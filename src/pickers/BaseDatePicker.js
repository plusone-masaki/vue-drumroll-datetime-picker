import { computed, h } from 'vue'
import * as constants from '../assets/constants'
import BasePicker from './BasePicker'
import useDayJS from '../composables/useDayJS'

const BaseDatePicker = {
  name: 'BaseDatePicker',
  props: {
    defaultValue: { type: String, default: undefined },
    format: { type: [String, Object], default: 'YYYY-MM-DD' },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: constants.DEFAULT_MIN_DATE },
    modelValue: { type: [String, Number, Date], default: undefined },
    unit: { type: String, required: true }, // year, month, date
    items: { type: Array, required: true },
  },

  setup: async (props, { emit }) => {
    const dayjs = await useDayJS(props.locale)
    const formatDefaultValue = computed(() => dayjs(props.defaultValue).format(props.format))

    const onInput = (value) => {
      if (!value) return

      let valueObj = dayjs.unix(value)
      if (valueObj.isBefore(props.minDate)) valueObj = dayjs(props.minDate)
      if (props.maxDate && valueObj.isAfter(props.maxDate)) valueObj = dayjs(props.maxDate)

      if (props.modelValue || valueObj.format(props.format) !== formatDefaultValue.value) {
        emit('update:modelValue', valueObj.format(props.format))
      }
    }

    return () => h(BasePicker, {
      ...props,
      modelValue: props.modelValue || props.defaultValue,
      'onUpdate:modelValue': onInput,
    })
  },
}

export default BaseDatePicker
