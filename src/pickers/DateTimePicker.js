import BaseDatePicker from './BaseDatePicker'
import BaseTimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import * as constants from '../data/constants'
import useBindings from '../mixins/useBindings'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'

const generateDatePicker = (h, options) => (
  h(BaseDatePicker, options({ separator: '-' }))
)

const generateTimePicker = (h, options) => (
  h(BaseTimePicker, options({ separator: ':' }))
)

export default {
  name: 'DateTimePicker',

  mixins: [
    useBindings,
    useDialog,
    useSensitivity,
  ],

  props: {
    type: { type: String, default: 'datetime' },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    hideButton: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
  },

  methods: {
    pickers (h) {
      const options = props => ({
        props: {
          ...this.$props,
          ...props,
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
    return this.dialog
      ? this.generateDialogPicker(h)
      : h('div', { class: ['v-drumroll-picker'] }, [h(PickerContainer, [this.pickers(h)])])
  },
}
