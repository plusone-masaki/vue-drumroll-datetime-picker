import dayjs from 'dayjs'
import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'
import BasePicker from './BasePicker'

const MONTH_UNIT = 12
const DIGIT = 2

export default {
  name: 'DatePicker',

  props: {
    format: { type: String, required: true },
    minYear: { type: [String, Number], required: true },
    maxYear: { type: [String, Number], required: true },
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
    }
  },

  computed: {
    /**
     * 年配列
     *
     * @return {array}
     */
    years () {
      const years = []
      for (let year = this.minYear; year < this.maxYear; year++) {
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
      // 桁揃えをしつつ時刻を配列に追加
      const months = []
      for (let month = 1; month <= MONTH_UNIT; month++) {
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
      // 桁揃えをしつつ時刻を配列に追加
      const days = []
      for (let date = 1; date <= this.numberOfDays; date++) {
        days.push({
          name: date <= this.date ? ('0' + date).slice(-DIGIT) : '',
          value: date,
        })
      }

      if (this.date !== this.numberOfDays) {
        this.$nextTick(() => setTimeout(() => {
          this.numberOfDays = this.date
        }, 100))
      }

      return days
    },
  },

  watch: {
    value (newValue) {
      const newDate = dayjs(newValue).endOf('month').date()
      if (newDate !== this.date) this.date = newDate
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

    return h(ScrollPickerGroup, { class: 'flex' }, [
      yearPicker,
      separator,
      monthPicker,
      separator,
      dayPicker,
    ])
  },
}
