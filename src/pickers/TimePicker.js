import {
  ScrollPicker,
  ScrollPickerGroup,
} from 'vue-scroll-picker'
import BasePicker from './BasePicker'
import dayjs from 'dayjs'
import * as constants from '../data/constants'

export default {
  name: 'TimePicker',

  props: {
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], required: true },
    minuteInterval: { type: [String, Number], default: 1 },
    value: { type: [String, Number, Date], default: undefined },

    /**
     * Dependency library properties
     * @see https://github.com/wan2land/vue-scroll-picker
     */
    dragSensitivity: { type: [String, Number], default: 1.7 },
    touchSensitivity: { type: [String, Number], default: 1.7 },
    scrollSensitivity: { type: [String, Number], default: 0.8 },
  },

  computed: {
    /**
     * 時配列
     *
     * @return {array}
     */
    hours () {
      const theDate = dayjs(this.value, this.format)
      const minDate = dayjs(this.minDate)

      const min = theDate.isSame(minDate, 'date') ? minDate.hour() : 0
      const max = this.maxDate && theDate.isSame(this.maxDate, 'date')
        ? dayjs(this.maxDate).hour() + 1
        : constants.HOUR_UNIT

      const hours = []
      for (let time = min; time < max; time++) {
        hours.push(('0' + time).slice(-constants.DIGIT))
      }
      return hours
    },

    /**
     * 分配列
     *
     * @return {array}
     */
    minutes () {
      const theDate = dayjs(this.value, this.format)
      const minDate = dayjs(this.minDate)

      const min = theDate.isSame(minDate, 'hour') ? minDate.minute() : 0
      const max = this.maxDate && theDate.isSame(this.maxDate, 'hour')
        ? dayjs(this.maxDate).minute() + 1
        : constants.MINUTE_UNIT

      const interval = Number(this.minuteInterval)
      const minutes = []
      for (let minute = min; minute < max; minute += interval) {
        minutes.push(('0' + minute).slice(-constants.DIGIT))
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
        width: constants.DIGIT + 'em',
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
        width: constants.DIGIT + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    return h(ScrollPickerGroup, { class: 'vdd-flex' }, [
      hourPicker,
      separator,
      minutePicker,
    ])
  },
}
