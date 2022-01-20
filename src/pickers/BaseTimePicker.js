import dayjs from '../modules/dayjs'
import { ScrollPickerGroup } from 'vue-scroll-picker'
import DrumDivider from '../components/DrumDivider'
import BasePicker from './BasePicker'
import * as constants from '../assets/constants'
import datestring from '../assets/datestring'
import useSensitivity from '../mixins/useSensitivity'

export default {
  name: 'BaseTimePicker',

  mixins: [useSensitivity],

  props: {
    defaultValue: { type: String, default: undefined },
    drumPattern: { type: Object, default: undefined },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    height: { type: [String, Number], default: undefined },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: undefined },
    minuteInterval: { type: [String, Number], default: 1 },
    separator: { type: String, default: undefined }, // deprecated
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

      const currentDate = dayjs(this.value)

      if (this.minDate) {
        const minDate = dayjs(this.minDate)
        min = currentDate.isSame(minDate, 'date') ? minDate.hour() : 0
      }
      if (this.maxDate) {
        max = this.maxDate && currentDate.isSame(this.maxDate, 'date')
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
      const currentDate = dayjs(this.value)
      let min = 0
      let max = constants.MINUTE_UNIT

      if (this.minDate) {
        const minDate = dayjs(this.minDate)
        min = currentDate.isSame(minDate, 'hour') ? minDate.minute() : 0
      }
      if (this.maxDate) {
        max = this.maxDate && currentDate.isSame(this.maxDate, 'hour')
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
      const modelValue = datestring(value, this.format, 'time')
      const defaultValue = datestring(this.defaultValue || dayjs().format(this.format), this.format, 'time')
      if (modelValue && (this.value || modelValue !== defaultValue)) this.$emit('input', dayjs(modelValue).format(this.format))
    },
  },

  render (h) {
    // 境界線
    const divider = h(DrumDivider, {
      props: {
        divider: this.separator || this.drumPattern.dividerTime || this.drumPattern['divider-time'],
      },
    })

    // 時
    const hourPicker = h(BasePicker, {
      props: {
        ...this.$props,
        items: this.hours,
        unit: 'hour',
        width: constants.DIGIT + 'em',
      },
      on: {
        input: this.onInput,
      },
    })

    // 分
    const minutePicker = h(BasePicker, {
      props: {
        ...this.$props,
        items: this.minutes,
        unit: 'minute',
        width: constants.DIGIT + 'em',
      },
      on: {
        input: this.onInput,
      },
    })

    return h(ScrollPickerGroup, { class: 'vdd-flex' }, [
      hourPicker,
      divider,
      minutePicker,
    ])
  },
}
