import * as constants from '../assets/constants'
import useBindings from '../mixins/useBindings'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'
import PickerContainer from '../components/PickerContainer'
import BaseDatePicker from './BaseDatePicker'
import BaseTimePicker from './BaseTimePicker'

const generateDatePicker = (h, options) => (
  h(BaseDatePicker, options())
)

const generateTimePicker = (h, options) => (
  h(BaseTimePicker, options())
)

export default {
  name: 'DateTimePicker',

  mixins: [
    useBindings,
    useDialog,
    useSensitivity,
  ],

  props: {
    dateOrder: { type: Array, default: undefined },
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
    type: { type: String, default: 'datetime' },
  },

  methods: {
    pickers (h) {
      const options = props => ({
        props: {
          ...this.$props,
          ...props,
          value: this.modelValue,
          format: this.modelFormat,
          drumPattern: this.drumPattern,
        },
        on: { input: this.onInput },
      })

      switch (this.type) {
        case 'datetime': return [generateDatePicker(h, options), generateTimePicker(h, options)]
        case 'date': return [generateDatePicker(h, options)]
        case 'time': return [generateTimePicker(h, options)]
      }
    },
  },

  render (h) {
    if (this.dialog) {
      return this.generateDialogPicker(h)
    } else {
      const container = h(PickerContainer, { props: this.$props }, [this.pickers(h)])
      return h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}
