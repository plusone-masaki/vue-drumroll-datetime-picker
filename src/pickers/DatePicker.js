import * as constants from '../assets/constants'
import useBindings from '../mixins/useBindings'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'
import PickerContainer from '../components/PickerContainer'
import BaseDatePicker from './BaseDatePicker'

export default {
  name: 'DatePicker',

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
    separator: { type: String, default: undefined }, // deprecated
  },

  computed: {
    type () {
      return 'date'
    },
  },

  methods: {
    pickers (h) {
      const options = () => ({
        props: {
          ...this.$props,
          value: this.modelValue,
          format: this.modelFormat,
          drumPattern: this.drumPattern,
        },
        on: { input: this.onInput },
      })

      return [h(BaseDatePicker, options())]
    },
  },

  render (h) {
    if (this.dialog) {
      return this.generateDialogPicker(h)
    } else {
      const props = {
        ...this.$props,
        value: this.modelValue,
        format: this.modelFormat,
        drumPattern: this.drumPattern,
      }
      const container = h(PickerContainer, { props }, [this.pickers(h)])
      return h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}
