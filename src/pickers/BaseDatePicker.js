import { ScrollPickerGroup } from 'vue-scroll-picker'
import * as constants from '../assets/constants'
import dayjs from '../modules/dayjs'
import { guessDateOrder } from '../modules/format-helper'
import useSensitivity from '../mixins/useSensitivity'
import DrumDivider from '../components/DrumDivider'
import BasePicker from './BasePicker'

export default {
  name: 'BaseDatePicker',

  mixins: [useSensitivity],

  props: {
    align: { type: String, default: 'center' },
    dateOrder: { type: Array, default: undefined },
    defaultValue: { type: String, default: undefined },
    drumPattern: { type: Object, required: true },
    format: { type: [String, Object], default: 'YYYY-MM-DD' },
    height: { type: [String, Number], default: undefined },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: constants.DEFAULT_MIN_DATE },
    separator: { type: String, default: undefined }, // deprecated
    value: { type: [String, Number, Date], default: undefined },
  },

  data () {
    const date = dayjs(this.value || this.defaultValue, this.format).endOf('month').date()
    return {
      date: date,
      numberOfDays: date,
      dateOfMin: 1,
      monthOfMin: 0,
    }
  },

  computed: {
    formatDefaultValue () {
      return dayjs(this.defaultValue).format(this.format)
    },

    /**
     * 年配列
     *
     * @return {array}
     */
    years () {
      const value = this.value || this.defaultValue
      const minYear = dayjs(this.minDate).year()
      const maxYear = this.maxDate
        ? dayjs(this.maxDate).year()
        : dayjs(value, this.format).add(100, 'year').year()

      const years = []
      const dateObj = dayjs(value, this.format)
      for (let year = minYear; year <= maxYear; year++) {
        years.push({
          name: dateObj.set('year', year).format(this.drumPattern.year),
          value: year,
        })
      }

      return years
    },

    /**
     * 月配列
     *
     * @return {array}
     */
    months () {
      const value = this.value || this.defaultValue
      const currentDate = dayjs(value, this.format)
      const minDate = dayjs(this.minDate)
      let min = currentDate.isSame(minDate, 'year') ? minDate.month() : 0
      let max = this.maxDate && currentDate.isSame(this.maxDate, 'year')
        ? dayjs(this.maxDate).month() + 1
        : constants.MONTH_UNIT

      if (min > currentDate.month() || max < currentDate.month()) {
        min = 0
        max = constants.MONTH_UNIT
      }

      // 桁揃えをしつつ時刻を配列に追加
      const months = []
      const dateObj = dayjs(value, this.format)
      for (let month = Math.min(this.monthOfMin, min); month < max; month++) {
        months.push({
          name: dateObj.set('month', month).format(this.drumPattern.month),
          value: month,
        })
      }

      this.$nextTick(() => setTimeout(() => {
        this.monthOfMin = min
      }, 100))

      return months
    },

    /**
     * 日配列
     *
     * @params {string} date
     * @return {array}
     */
    days () {
      const value = this.value || this.defaultValue
      const currentDate = dayjs(value, this.format)
      const minDate = dayjs(this.minDate)
      let min = currentDate.isSame(minDate, 'month') ? minDate.date() : 1
      let max = this.maxDate && currentDate.isSame(this.maxDate, 'month')
        ? dayjs(this.maxDate).date()
        : this.numberOfDays

      if (min > currentDate.date() || max < currentDate.date()) {
        min = 1
        max = this.numberOfDays
      }

      // 桁揃えをしつつ時刻を配列に追加
      const days = []
      const dateObj = currentDate.clone()
      for (let date = Math.min(this.dateOfMin, min); date <= max; date++) {
        days.push({
          name: date <= this.date && date >= min ? dateObj.set('date', date).format(this.drumPattern.date) : '',
          value: date,
        })
      }

      this.$nextTick(() => setTimeout(() => {
        this.dateOfMin = min
        this.numberOfDays = this.date
      }, 100))

      return days
    },
  },

  watch: {
    value (newValue) {
      const newDate = dayjs(newValue, this.format)
      this.date = newDate.endOf('month').date()
    },
  },

  methods: {
    onInput (value) {
      if (!value) return

      let valueObj = dayjs.unix(value)
      if (valueObj.isBefore(this.minDate)) valueObj = dayjs(this.minDate)
      if (this.maxDate && valueObj.isAfter(this.maxDate)) valueObj = dayjs(this.maxDate)

      if (this.value || valueObj.format(this.format) !== this.formatDefaultValue) {
        this.$emit('input', valueObj.format(this.format))
      }
    },
  },

  render (h) {
    const divider = this.separator || this.drumPattern.dividerDate || this.drumPattern['divider-date']
    const drumDivider = divider ? h(DrumDivider, { props: { divider } }) : null

    const drums = {
      year: h(BasePicker, {
        props: {
          items: this.years,
          unit: 'year',
          ...this.$props,
          value: this.value || this.defaultValue,
        },
        on: {
          input: this.onInput,
        },
      }),
      month: h(BasePicker, {
        props: {
          items: this.months,
          unit: 'month',
          ...this.$props,
          value: this.value || this.defaultValue,
        },
        on: {
          input: this.onInput,
        },
      }),
      date: h(BasePicker, {
        props: {
          items: this.days,
          unit: 'date',
          ...this.$props,
          value: this.value || this.defaultValue,
        },
        on: {
          input: this.onInput,
        },
      }),
    }

    const pickers = []
    const dateOrder = this.dateOrder || guessDateOrder(this.format)
    for (let i = 0; i < dateOrder.length; i++) {
      pickers.push(drums[dateOrder[i]])
      if (divider && i < dateOrder.length - 1) pickers.push(drumDivider)
    }

    return h(ScrollPickerGroup, pickers)
  },
}
