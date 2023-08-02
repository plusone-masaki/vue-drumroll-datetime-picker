import { computed, h } from 'vue'
import { calculatePattern, datestring } from '../modules/format-helper'
import BaseTimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'
import useProvide from '../composables/useProvide'
import dayjs from '../modules/dayjs'

const TimePicker = {
  mixins: [
    useDialog,
    useSensitivity,
  ],

  props: {
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    minuteInterval: { type: [String, Number], default: 1 },
    separator: { type: String, default: undefined }, // deprecated
    align: { type: String, default: 'right' },
    defaultValue: { type: String, default: undefined },
    pattern: { type: Object, default: undefined },
    format: { type: [String, Object], default: undefined },
    modelValue: { type: [String, Number, Date], default: undefined },
  },

  setup (props, { emit }) {
    useProvide(props)
    const { generateDialogPicker } = useDialog('time', props)

    const drumPattern = computed(() => ({
      ...calculatePattern(props.format || 'HH:mm'),
      ...(props.pattern || {}),
    }))

    const onInput = (value) => {
      emit('update:modelValue', datestring(value, this.modelFormat, 'time'))
    }

    const pickers = () => {
      const options = {
        ...props,
        modelValue: props.modelValue,
        format: props.format || 'HH:mm',
        drumPattern,
        'onUpdate:modelValue': onInput,
      }

      return [h(BaseTimePicker, options())]
    }

    if (props.dialog) {
      return generateDialogPicker()
    } else {
      const options = {
        ...props,
        value: this.modelValue,
        format: this.modelFormat,
        drumPattern: this.drumPattern,
      }
      const container = h(PickerContainer, options, [this.pickers()])
      return () => h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}

export default TimePicker
