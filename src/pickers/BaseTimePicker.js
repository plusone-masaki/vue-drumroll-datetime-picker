import dayjs from 'dayjs'
import { ScrollPickerGroup } from 'vue-scroll-picker'
import DrumrollSeparator from '../components/DrumrollSeparator'
import BasePicker from './BasePicker'
import * as constants from '../data/constants'
import useSensitivity from '../mixins/useSensitivity'

export default {
  name: 'BaseTimePicker',

  mixins: [useSensitivity],

  props: {
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    height: { type: [String, Number], default: undefined },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: undefined },
    minuteInterval: { type: [String, Number], default: 1 },
    separator: { type: String, required: true },
    value: { type: [String, Number, Date], default: undefined },
  },

  computed: {
    /**
     * 時配列
     *
     * @return {array}
     */
    hours () {
      let min = 0
      let max = constants.HOUR_UNIT

      const theDate = dayjs(this.value, this.format)

      if (this.minDate) {
        const minDate = dayjs(this.minDate)
        min = theDate.isSame(minDate, 'date') ? minDate.hour() : 0
      }
      if (this.maxDate) {
        max = this.maxDate && theDate.isSame(this.maxDate, 'date')
          ? dayjs(this.maxDate).hour() + 1 : constants.HOUR_UNIT
      }

      const hours = []
      for (let time = min; time < max; time++) hours.push(('0' + time).slice(-constants.DIGIT))
      return hours
    },

    /**
     * 分配列
     *
     * @return {array}
     */
    minutes () {
      const theDate = dayjs(this.value, this.format)
      let min = 0
      let max = constants.MINUTE_UNIT

      if (this.minDate) {
        const minDate = dayjs(this.minDate)
        min = theDate.isSame(minDate, 'hour') ? minDate.minute() : 0
      }
      if (this.maxDate) {
        max = this.maxDate && theDate.isSame(this.maxDate, 'hour')
          ? dayjs(this.maxDate).minute() + 1
          : constants.MINUTE_UNIT
      }

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
    const separator = h(DrumrollSeparator, { props: { separator: this.separator } })

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
