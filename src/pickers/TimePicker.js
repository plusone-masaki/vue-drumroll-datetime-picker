import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'
import BasePicker from './BasePicker'

const HOUR_UNIT = 24
const MINUTE_UNIT = 60
const DIGIT = 2

export default {
  name: 'TimePicker',

  props: {
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    minuteInterval: { type: [String, Number], default: 1 },
    value: { type: [String, Number, Date], required: true },

    /**
     * Parent library properties
     * @see https://github.com/wan2land/vue-scroll-picker
     */
    dragSensitivity: { type: [String, Number], default: 1.7 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
    scrollSensitivity: { type: [String, Number], default: 1 },
  },

  computed: {
    /**
     * 時配列
     *
     * @return {array}
     */
    hours () {
      const hours = []
      for (let time = 0; time < HOUR_UNIT; time++) {
        hours.push(('0' + time).slice(-DIGIT))
      }
      return hours
    },

    /**
     * 分配列
     *
     * @return {array}
     */
    minutes () {
      const interval = Number(this.minuteInterval)
      const minutes = []
      for (let minute = 0; minute < MINUTE_UNIT; minute += interval) {
        minutes.push(('0' + minute).slice(-DIGIT))
      }
      return minutes
    },
  },

  methods: {
    onInput (value) {
      this.$emit('input', value)
    },
  },

  render (h) {
    // 境界線
    const separator = h(ScrollPicker, {
      style: { width: '0.5em' },
      props: { options: [':'] },
    })

    // 時
    const hourPicker = h(BasePicker, {
      props: {
        items: this.hours,
        unit: 'hour',
        width: DIGIT + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    // 分
    const minutePicker = h(BasePicker, {
      props: {
        items: this.minutes,
        unit: 'minute',
        width: DIGIT + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    return h(ScrollPickerGroup, { class: 'flex' }, [
      hourPicker,
      separator,
      minutePicker,
    ])
  },
}
