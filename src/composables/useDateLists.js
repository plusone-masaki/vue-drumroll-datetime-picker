import { computed, nextTick, ref, watch } from 'vue'
import dayjs from '../modules/dayjs'
import * as constants from '../assets/constants'

export default (props, drumPattern) => {
  const date = ref(dayjs(props.modelValue || props.defaultValue, props.format).endOf('month').date())
  const numberOfDays = ref(date.value)
  const dateOfMin = ref(1)
  const monthOfMin = ref(0)

  watch(() => props.modelValue, (newValue) => {
    const newDate = dayjs(newValue, props.format)
    date.value = newDate.endOf('month').date()
  })

  const years = computed(() => {
    const value = props.modelValue || props.defaultValue
    const minYear = dayjs(props.minDate).year()
    const maxYear = props.maxDate
      ? dayjs(props.maxDate).year()
      : dayjs(value, props.format).add(100, 'year').year()

    const yearItems = []
    const dateObj = dayjs(value, props.format)
    for (let year = minYear; year <= maxYear; year++) {
      yearItems.push({
        name: dateObj.set('year', year).format(drumPattern.value.year),
        value: year,
      })
    }

    return yearItems
  })

  const months = computed(() => {
    const value = props.modelValue || props.defaultValue
    const currentDate = dayjs(value, props.format)
    const minDate = dayjs(props.minDate)
    let min = currentDate.isSame(minDate, 'year') ? minDate.month() : 0
    let max = props.maxDate && currentDate.isSame(props.maxDate, 'year')
      ? dayjs(props.maxDate).month() + 1
      : constants.MONTH_UNIT

    if (min > currentDate.month() || max < currentDate.month()) {
      min = 0
      max = constants.MONTH_UNIT
    }

    // 桁揃えをしつつ時刻を配列に追加
    const monthItems = []
    const dateObj = dayjs(value, props.format)
    for (let month = Math.min(monthOfMin.value, min); month < max; month++) {
      monthItems.push({
        name: dateObj.set('month', month).format(drumPattern.value.month),
        value: month,
      })
    }

    nextTick(() => setTimeout(() => {
      monthOfMin.value = min
    }, 100))

    return monthItems
  })

  const days = computed(() => {
    const value = props.modelValue || props.defaultValue
    const currentDate = dayjs(value, props.format)
    const minDate = dayjs(props.minDate)
    let min = currentDate.isSame(minDate, 'month') ? minDate.date() : 1
    let max = props.maxDate && currentDate.isSame(props.maxDate, 'month')
      ? dayjs(props.maxDate).date()
      : numberOfDays.value

    if (min > currentDate.date() || max < currentDate.date()) {
      min = 1
      max = numberOfDays.value
    }

    // 桁揃えをしつつ時刻を配列に追加
    const dayItems = []
    const dateObj = currentDate.clone()
    for (let day = Math.min(dateOfMin.value, min); day <= max; day++) {
      dayItems.push({
        name: day <= date.value && day >= min ? dateObj.set('date', day).format(drumPattern.value.date) : '',
        value: day,
      })
    }

    nextTick(() => setTimeout(() => {
      dateOfMin.value = min
      numberOfDays.value = date.value
    }, 100))

    return dayItems
  })

  return {
    years,
    months,
    days,
  }
}
