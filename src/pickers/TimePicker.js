import TimePicker from './BaseTimePicker'
import PickerContainer from '../components/PickerContainer'
import useBindings from '../mixins/useBindings'
import useDialog from '../mixins/useDialog'
import useSensitivity from '../mixins/useSensitivity'

export default {
  name: 'TimePicker',

  mixins: [
    useBindings,
    useDialog,
    useSensitivity,
  ],

  props: {
    height: { type: [String, Number], default: undefined },
    hideButton: { type: Boolean, default: false },
    minuteInterval: { type: [String, Number], default: 1 },
    separator: { type: String, default: ':' },
  },

  computed: {
    type () {
      return 'time'
    },
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
    if (this.dialog) {
      return this.generateDialogPicker(h)
    } else {
      const props = {
        ...this.$props,
        value: this.modelValue,
        format: this.modelFormat,
      }
      const container = h(PickerContainer, { props }, [this.pickers(h)])
      return h('div', { class: ['v-drumroll-picker'] }, [container])
    }
  },
}
