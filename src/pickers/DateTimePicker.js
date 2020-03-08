import dayjs from 'dayjs'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import OverlayLayer from '../layers/OverlayLayer'
import ContentLayer from '../layers/ContentLayer'

export default {
  name: 'DateTimePicker',

  props: {
    type: { type: String, default: 'datetime' },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    hideOverlay: { type: Boolean, default: false },
    maxYear: { type: [String, Number], default: dayjs().year() + 100 },
    minYear: { type: [String, Number], default: 1970 },
    minuteInterval: { type: [String, Number], default: 1 },
    value: { type: [String, Number, Date], required: true },

    /**
     * Parent library properties
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
      const options = {
        props: this.$props,
        on: { input: value => this.$emit('input', value) },
      }

      switch (this.type) {
        case 'datetime': return [h(DatePicker, options), h(TimePicker, options)]
        case 'date': return [h(DatePicker, options)]
        case 'time': return [h(TimePicker, options)]
      }
    },

    generateActivator (h) {
      const on = {
        click: this.onActivate,
        focus: this.onActivate,
        touchend: this.onActivate,
      }

      if (this.$scopedSlots.activator) {
        return h(this.$scopedSlots.activator, { props: { on } })
      } else {
        const options = {
          attrs: {
            value: dayjs(this.value).format(this.format),
          },
          on: {
            input: value => this.$emit('input', dayjs(value).format(this.format)),
            ...on,
          },
        }
        return h('input', options)
      }
    },

    onActivate (e) {
      e.preventDefault()
      this.active = true
    },

    offActivate (e) {
      e.preventDefault()
      this.active = false
    },
  },

  render (h) {
    const children = [this.generateActivator(h)]

    if (this.active) {
      children.push(h(ContentLayer, this.pickers(h)))
      this.hideOverlay || children.push(h(
        OverlayLayer, {
          on: {
            click: this.offActivate,
          },
        },
      ))
    }

    return h('div', { class: ['v-drumroll-picker'] }, children)
  },
}
