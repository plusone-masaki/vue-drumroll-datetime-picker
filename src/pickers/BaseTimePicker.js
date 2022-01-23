import dayjs from '../modules/dayjs'
import { ScrollPickerGroup } from 'vue-scroll-picker'
import DrumDivider from '../components/DrumDivider'
import BasePicker from './BasePicker'
import * as constants from '../assets/constants'
import useSensitivity from '../mixins/useSensitivity'
import { calculateWidth } from '../modules/format-helper'

export default {
  name: 'BaseTimePicker',

  mixins: [useSensitivity],

  props: {
    align: { type: String, default: 'center' },
    defaultValue: { type: String, default: undefined },
    drumPattern: { type: Object, required: true },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    height: { type: [String, Number], default: undefined },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: undefined },
    minuteInterval: { type: [String, Number], default: 1 },
    separator: { type: String, default: undefined }, // deprecated
    value: { type: [String, Number, Date], default: undefined },
  },

  computed: {
    formatDefaultValue () {
      return dayjs(this.defaultValue).format(this.format)
    },

    /**
     * 時配列
     *
     * @return {array}
     */
    hours () {
      let min = 0
      let max = constants.HOUR_UNIT

      const value = this.value || this.defaultValue
      const currentDate = value ? dayjs(value, this.format) : dayjs()

      if (this.minDate) {
        const minDate = dayjs(this.minDate)
        min = currentDate.isSame(minDate, 'date') ? minDate.hour() : 0
      }
      if (this.maxDate) {
        max = this.maxDate && currentDate.isSame(this.maxDate, 'date')
          ? dayjs(this.maxDate).hour() + 1 : constants.HOUR_UNIT
      }

      const hours = []
      const dateObj = currentDate.clone()
      for (let hour = min; hour < max; hour++) {
        hours.push({
          name: dateObj.set('hour', hour).format(this.drumPattern.hour),
          value: hour,
        })
      }
      return hours
    },

    /**
     * 分配列
     *
     * @return {array}
     */
    minutes () {
      let min = 0
      let max = constants.MINUTE_UNIT

      const value = this.value || this.defaultValue
      const currentDate = value ? dayjs(value, this.format) : dayjs()

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
      const dateObj = currentDate.clone()
      for (let minute = min; minute < max; minute += interval) {
        minutes.push({
          name: dateObj.set('minute', minute).format(this.drumPattern.minute),
          value: minute,
        })
      }
      return minutes
    },
  },

  methods: {
    onInput (value) {
      if (value && (this.value || dayjs.unix(value).format(this.format) !== this.formatDefaultValue)) {
        this.$emit('input', dayjs.unix(value).format(this.format))
      }
    },
  },

  render (h) {
    const divider = this.separator || this.drumPattern.dividerTime || this.drumPattern['divider-time']
    const drumDivider = divider ? h(DrumDivider, { props: { divider } }) : null
    const sampleDate = dayjs('1989-12-31 10:10:10')

    // 時
    const hourPicker = h(BasePicker, {
      props: {
        ...this.$props,
        items: this.hours,
        unit: 'hour',
        width: calculateWidth(sampleDate.format(this.drumPattern.hour)) + 'em',
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
        width: calculateWidth(sampleDate.format(this.drumPattern.minute)) + 'em',
      },
      on: {
        input: this.onInput,
      },
    })

    return h(ScrollPickerGroup, { class: 'vdd-flex' }, [
      hourPicker,
      drumDivider,
      minutePicker,
    ])
  },
}
