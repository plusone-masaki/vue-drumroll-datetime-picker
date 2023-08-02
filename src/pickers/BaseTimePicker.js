import { computed, h, inject, nextTick, ref } from 'vue'
import dayjs from '../modules/dayjs'
import DrumDivider from '../components/DrumDivider'
import BasePicker from './BasePicker'
import * as constants from '../assets/constants'

const BaseTimePicker = {
  props: {
    align: { type: String, default: 'center' },
    defaultValue: { type: String, default: undefined },
    drumPattern: { type: Object, required: true },
    format: { type: String, default: 'YYYY-MM-DD HH:mm' },
    height: { type: [String, Number], default: undefined },
    maxDate: { type: [String, Number, Date], default: undefined },
    minDate: { type: [String, Number, Date], default: undefined },
    minuteInterval: { type: [String, Number], default: 1 },
    modelValue: { type: [String, Number, Date], default: undefined },
  },

  setup (props, { emit }) {
    const defaultValue = inject('defaultValue')
    const pattern = inject('pattern')
    const format = inject('format', '')

    const divider = this.separator || this.drumPattern.dividerTime || this.drumPattern['divider-time']
    const drumDivider = divider ? h(DrumDivider, { props: { divider } }) : null

    const formatDefaultValue = computed(() => dayjs(this.defaultValue).format(format))
    const hourOfMin = ref(0)
    const minuteOfMin = ref(0)

    const onInput = (value) => {
      if (value && (props.value || dayjs.unix(value).format(format) !== formatDefaultValue.value)) {
        emit('input', dayjs.unix(value).format(format))
      }
    }

    /**
       * 時配列
       *
       * @return {array}
       */
    const hours = computed(() => {
      let min = 0
      let max = constants.HOUR_UNIT

      const value = props.value || defaultValue
      const currentDate = value ? dayjs(value, format) : dayjs()

      if (props.minDate) {
        const minDate = dayjs(props.minDate)
        min = currentDate.isSame(minDate, 'date') ? minDate.hour() : 0
      }
      if (props.maxDate) {
        max = props.maxDate && currentDate.isSame(props.maxDate, 'date')
          ? dayjs(props.maxDate).hour() + 1
          : constants.HOUR_UNIT
      }

      const hours = []
      const dateObj = currentDate.clone()
      for (let hour = Math.min(hourOfMin.value, min); hour < max; hour++) {
        hours.push({
          name: dateObj.set('hour', hour).format(props.drumPattern.hour),
          value: hour,
        })
      }

      nextTick(() => setTimeout(() => {
        hourOfMin.value = min
      }, 100))

      return hours
    })

    /**
       * 分配列
       *
       * @return {array}
       */
    const minutes = computed(() => {
      let min = 0
      let max = constants.MINUTE_UNIT

      const value = props.value || defaultValue
      const currentDate = value ? dayjs(value, format) : dayjs()

      if (props.minDate) {
        const minDate = dayjs(props.minDate)
        min = currentDate.isSame(minDate, 'hour') ? minDate.minute() : 0
      }
      if (props.maxDate) {
        max = props.maxDate && currentDate.isSame(props.maxDate, 'hour')
          ? dayjs(props.maxDate).minute() + 1
          : constants.MINUTE_UNIT
      }

      const interval = Number(props.minuteInterval)
      const minutes = []
      const dateObj = currentDate.clone()
      for (let minute = Math.min(minuteOfMin.value, min); minute < max; minute += interval) {
        minutes.push({
          name: dateObj.set('minute', minute).format(props.drumPattern.minute),
          value: minute,
        })
      }

      nextTick(() => setTimeout(() => {
        minuteOfMin.value = min
      }, 100))

      return minutes
    })

    // 時
    const hourPicker = h(BasePicker, {
      props: {
        ...props,
        items: hours,
        unit: 'hour',
      },
      on: {
        input: onInput,
      },
    })

    // 分
    const minutePicker = h(BasePicker, {
      props: {
        ...props,
        items: minutes,
        unit: 'minute',
      },
      on: {
        input: onInput,
      },
    })

    return h('div', [
      hourPicker,
      drumDivider,
      minutePicker,
    ])
  },
}

export default BaseTimePicker
