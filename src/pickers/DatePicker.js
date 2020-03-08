import dayjs from 'dayjs'
import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'
import BasePicker from './BasePicker'

const MONTH_UNIT = 12
const DIGIT = 2

export default {
  name: 'DatePicker',
  components: { ScrollPicker, ScrollPickerGroup, BasePicker },

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
      oldDate: date,
    }
  },

  computed: {
    /**
     * 年配列
     *
     * @return {array}
     */
    years () {
      const times = []
      for (let i = this.minYear; i < this.maxYear; i++) times.push(i)
      return times
    },

    /**
     * 月配列
     *
     * @return {array}
     */
    months () {
      // 桁揃えをしつつ時刻を配列に追加
      const times = []
      for (let time = 1; time <= MONTH_UNIT; time++) {
        times.push({ name: ('0' + time).slice(-DIGIT), value: ('0' + (time - 1)).slice(-DIGIT) })
      }

      return times
    },

    /**
     * 日配列
     *
     * @params {string} date
     * @return {array}
     */
    days () {
      // 桁揃えをしつつ時刻を配列に追加
      const times = []
      for (let time = 1; time <= this.oldDate; time++) {
        times.push({
          name: time <= this.date ? ('0' + time).slice(-DIGIT) : '',
          value: time,
        })
      }

      if (this.date !== this.oldDate) {
        this.$nextTick(() => setTimeout(() => { this.oldDate = this.date }, 100))
      }
      return times
    },
  },

  watch: {
    value (newValue) {
      const newDate = dayjs(newValue).endOf('month').date()
      if (newDate !== this.date) this.date = newDate
    },
  },

  render (h) {
    // 境界線
    const separator = h(ScrollPicker, { style: { width: '0.5em' }, props: { options: ['-'] } })

    // 年
    const yearPicker = h(BasePicker, {
      props: {
        items: this.years,
        unit: 'year',
        width: DIGIT * 1.5 + 'em',
        ...this.$props,
      },
      on: {
        input: value => this.$emit('input', value),
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
        input: value => this.$emit('input', value),
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
        input: value => this.$emit('input', value),
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
