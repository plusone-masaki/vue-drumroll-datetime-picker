import dayjs from 'dayjs'
import * as constants from '../assets/constants'
import datestring from '../assets/datestring'
import PickerContainer from '../components/PickerContainer'
import DatePicker from './BaseDatePicker'
import useBindings from '../mixins/useBindings'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'

export default {
  name: 'DatePicker',

  mixins: [
    useBindings,
    useDialog,
    useSensitivity,
  ],

  props: {
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    separator: { type: String, default: '-' },
  },

  computed: {
    type () {
      return 'date'
    },
  },

  methods: {
    onInput (value) {
      if (this.maxDate && dayjs(value).isAfter(this.maxDate)) {
        this.modelValue = datestring(this.maxDate, this.modelFormat, this.type)
      } else {
        this.modelValue = datestring(value, this.modelFormat, this.type)
      }
    },

    pickers (h) {
      const options = () => ({
        props: this.$props,
        on: { input: this.onInput },
      })

      return [h(DatePicker, options())]
    },
  },

  render (h) {
    if (this.dialog) {
      return this.generateDialogPicker(h)
    } else {
      const props = {
        ...this.$props,
        value: this.modelValue,
      }
      const container = h(PickerContainer, { props }, [this.pickers(h)])
      return h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}
