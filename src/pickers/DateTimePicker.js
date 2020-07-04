import dayjs from 'dayjs'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import OverlayLayer from '../components/OverlayLayer'
import ContentLayer from '../components/ContentLayer'
import PickerContainer from '../components/PickerContainer'

const date = dayjs()
const DEFAULT_MIN_DATE = date.subtract(100, 'year').toDate()

export default {
  name: 'DateTimePicker',

  props: {
    type: { type: String, default: 'datetime' },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: () => DEFAULT_MIN_DATE },
    minuteInterval: { type: [String, Number], default: 1 },
    value: { type: [String, Number, Date], required: true },

    dialog: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },

    /**
     * Dependency library properties
     * @see https://github.com/wan2land/vue-scroll-picker
     */
    dragSensitivity: { type: [String, Number], default: 1.7 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
    scrollSensitivity: { type: [String, Number], default: 0.8 },
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
        case 'datetime': return [h(DatePicker, options()), h(TimePicker, options())]
        case 'date': return [h(DatePicker, options())]
        case 'time': return [h(TimePicker, options())]
      }
    },

    generateActivator (h) {
      const on = {
        click: this.onActivate,
        focus: this.onActivate,
        touchend: this.onActivate,
      }

      if (this.$scopedSlots.activator) {
        return this.$scopedSlots.activator({ on })
      }

      // Fallback default
      const options = {
        class: 'v-drumroll-picker__input',
        attrs: { value: this.value },
        on: { input: this.onNativeInput, ...on },
      }
      return h('input', options)
    },

    generateDialogPicker (h) {
      const content = [this.generateActivator(h)]

      if (this.active) {
        // overlay
        content.push(h(OverlayLayer, {
          props: { dark: !this.hideOverlay },
          on: { click: this.offActivate },
        }))

        // picker
        const picker = h(PickerContainer, [this.pickers(h)])
        content.push(h(ContentLayer, [picker]))
      }
      return h('div', { class: ['v-drumroll-picker', 'v-drumroll-picker--dialog'] }, content)
    },

    onActivate (e) {
      e.preventDefault()
      this.active = true
    },

    offActivate (e) {
      e.preventDefault()
      this.active = false
    },

    onInput (value) {
      this.$emit('input', value)
    },

    onNativeInput (event) {
      this.$emit('input', event.target.value)
    },
  },

  render (h) {
    return this.dialog
      ? this.generateDialogPicker(h)
      : h('div', { class: ['v-drumroll-picker'] }, [h(PickerContainer, [this.pickers(h)])])
  },
}
