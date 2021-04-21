import BaseDatePicker from './BaseDatePicker'
import BaseTimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import * as constants from '../data/constants'
import useBindings from '@/mixins/useBindings'
import useDialog from '@/mixins/useDialog'
import useSensitivity from '@/mixins/useSensitivity'

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

      switch (this.type) {
        case 'datetime': return [h(BaseDatePicker, options()), h(BaseTimePicker, options())]
        case 'date': return [h(BaseDatePicker, options())]
        case 'time': return [h(BaseTimePicker, options())]
      }
    },
  },

  render (h) {
    return this.dialog
      ? this.generateDialogPicker(h)
      : h('div', { class: ['v-drumroll-picker'] }, [h(PickerContainer, [this.pickers(h)])])
  },
}
