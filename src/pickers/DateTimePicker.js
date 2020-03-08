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
    minYear: { type: [String, Number], default: 1970 },
    maxYear: { type: [String, Number], default: dayjs().year() + 100 },
    dragSensitivity: { type: [String, Number], default: 1.7 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
    scrollSensitivity: { type: [String, Number], default: 0.8 },
    value: { type: [String, Number, Date], required: true },
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
        on: {
          input: value => {
            this.$emit('input', value)
            this.$emit('update:value', value)
          },
        },
      }

      switch (this.type) {
        case 'datetime': return [h(DatePicker, options), h(TimePicker, options)]
        case 'date': return [h(DatePicker, options)]
        case 'time': return [h(TimePicker, options)]
      }
    },

    generateActivator (h) {
      const options = {
        on: {
          click: this.onActivate,
          focus: this.onActivate,
          touchend: this.onActivate,
        },
      }

      if (this.$scopedSlots.activator) {
        return h(this.$scopedSlots.activator, { props: options })
      } else {
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
    const children = [
      this.generateActivator(h),
    ]

    if (this.active) {
      children.push(h(
        OverlayLayer, {
          on: {
            click: this.offActivate,
          },
        },
      ))
      children.push(h(ContentLayer, this.pickers(h)))
    }

    return h('div', { class: ['v-drumroll-picker'] }, children)
  },
}
