import dayjs from 'dayjs'
import {
  ScrollPicker,
  ScrollPickerGroup,
} from 'vue-scroll-picker'
import BasePicker from './BasePicker'

const MONTH_UNIT = 12
const DIGIT = 2

export default {
  name: 'DatePicker',

  props: {
    format: { type: String, required: true },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], required: true },
    value: { type: [String, Number, Date], required: true },

    /**
     * Parent library properties
     * @see https://github.com/wan2land/vue-scroll-picker
     */
    dragSensitivity: { type: [String, Number], required: true },
    touchSensitivity: { type: [String, Number], required: true },
    scrollSensitivity: { type: [String, Number], required: true },
  },

  data () {
    const date = dayjs(this.value).endOf('month').date()
    return {
      date: date,
      numberOfDays: date,
      dateOfMin: 1,
    }
  },

  computed: {
    /**
     * 年配列
     *
     * @return {array}
     */
    years () {
      const maxYear = this.maxDate
        ? dayjs(this.maxDate).year()
        : dayjs(this.value, this.format).add(100, 'year').year()

      const years = []
      for (let year = dayjs(this.minDate).year(); year <= maxYear; year++) {
        years.push(year)
      }

      return years
    },

    /**
     * 月配列
     *
     * @return {array}
     */
    months () {
      const theDate = dayjs(this.value, this.format)
      const minDate = dayjs(this.minDate)
      const min = theDate.isSame(minDate, 'year') ? minDate.format('M') : 1

      const max = this.maxDate && theDate.isSame(this.maxDate, 'year')
        ? dayjs(this.maxDate).format('M')
        : MONTH_UNIT

      // 桁揃えをしつつ時刻を配列に追加
      const months = []
      for (let month = min; month <= max; month++) {
        months.push({
          name: ('0' + month).slice(-DIGIT),
          value: month - 1,
        })
      }

      return months
    },

    /**
     * 日配列
     *
     * @params {string} date
     * @return {array}
     */
    days () {
      const theDate = dayjs(this.value, this.format)
      const minDate = dayjs(this.minDate)

      const min = theDate.isSame(minDate, 'month') ? minDate.date() : 1
      const max = this.maxDate && theDate.isSame(this.maxDate, 'month')
        ? dayjs(this.maxDate).date()
        : this.numberOfDays

      // 桁揃えをしつつ時刻を配列に追加
      const days = []
      for (let date = this.dateOfMin; date <= max; date++) {
        days.push({
          name: date <= this.date && date >= min ? ('0' + date).slice(-DIGIT) : '',
          value: date,
        })
      }

      this.$nextTick(() => setTimeout(() => {
        this.dateOfMin = min
        if (this.date !== this.numberOfDays) {
          this.numberOfDays = this.date
        }
      }, 100))

      return days
    },
  },

  watch: {
    value (newValue) {
      const newDate = dayjs(newValue)
      const lastDate = newDate.endOf('month').date()
      if (lastDate !== this.date) this.date = lastDate
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
      props: { options: ['-'] },
    })

    // 年
    const yearPicker = h(BasePicker, {
      props: {
        items: this.years,
        unit: 'year',
        width: DIGIT * 1.5 + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    // 月
    const monthPicker = h(BasePicker, {
      props: {
        items: this.months,
        unit: 'month',
        width: DIGIT + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    // 日
    const dayPicker = h(BasePicker, {
      props: {
        items: this.days,
        unit: 'date',
        width: DIGIT + 'em',
        ...this.$props,
      },
      on: {
        input: this.onInput,
      },
    })

    return h(ScrollPickerGroup, { class: 'vdd-flex' }, [
      yearPicker,
      separator,
      monthPicker,
      separator,
      dayPicker,
    ])
  },
}
