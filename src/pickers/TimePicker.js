import TimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import * as constants from '../data/constants'
import useBindings from '@/mixins/useBindings'
import useDialog from '@/mixins/useDialog'
import useSensitivity from '@/mixins/useSensitivity'

export default {
  name: 'TimePicker',

  mixins: [
    useBindings,
    useDialog,
    useSensitivity,
  ],

  props: {
    format: { type: String, default: 'HH:mm' },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => constants.DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
    value: { type: [String, Number, Date], required: true },
  },

  data () {
    return {
      active: false,
    }
  },

  methods: {
    pickers (h) {
      const options = () => ({
        props: this.$props,
        on: { input: this.onInput },
      })

      return [h(TimePicker, options())]
    },
  },

  render (h) {
    return this.dialog
      ? this.generateDialogPicker(h)
      : h('div', { class: ['v-drumroll-picker'] }, [h(PickerContainer, [this.pickers(h)])])
  },
}
