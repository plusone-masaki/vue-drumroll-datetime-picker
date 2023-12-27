import { computed, nextTick, ref } from 'vue'
import * as constants from '../assets/constants'
import { dateFormat } from '../modules/format-helper'
import useDayJS from './useDayJS'

const dayjs = useDayJS()

export const useDateLists = (props, drumPattern) => {
  const baseDate = computed(() => (
    typeof props.modelValue === 'string'
      ? dayjs(props.modelValue, dateFormat(props.type, props.format))
      : dayjs(props.modelValue)
  ).locale(props.locale ?? dayjs.locale()))
  const date = computed(() => baseDate.value.endOf('month').date())
  const numberOfDays = ref(date.value)
  const dateOfMin = ref(1)
  const monthOfMin = ref(0)

  const years = computed(() => {
    const minYear = dayjs(props.minDate).year()
    const maxYear = props.maxDate
      ? dayjs(props.maxDate).year()
      : baseDate.value.add(100, 'year').year()

    const yearItems = []
    const dateObj = baseDate.value.locale(props.locale ?? dayjs.locale())

    for (let year = minYear; year <= maxYear; year++) {
      yearItems.push({
        name: dateObj.set('year', year).format(drumPattern.value.year),
        value: year,
      })
    }

    return yearItems
  })

  const months = computed(() => {
    const minDate = dayjs(props.minDate)
    let min = baseDate.value.isSame(minDate, 'year') ? minDate.month() : 0
    let max = props.maxDate && baseDate.value.isSame(props.maxDate, 'year')
      ? dayjs(props.maxDate).month() + 1
      : constants.MONTH_UNIT

    if (min > baseDate.value.month() || max < baseDate.value.month()) {
      min = 0
      max = constants.MONTH_UNIT
    }

    // 桁揃えをしつつ時刻を配列に追加
    const monthItems = []
    const dateObj = baseDate.value.clone()

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
    const minDate = dayjs(props.minDate)
    let min = baseDate.value.isSame(minDate, 'month') ? minDate.date() : 1
    let max = props.maxDate && baseDate.value.isSame(props.maxDate, 'month')
      ? dayjs(props.maxDate).date()
      : numberOfDays.value

    if (min > baseDate.value.date() || max < baseDate.value.date()) {
      min = 1
      max = numberOfDays.value
    }

    // 桁揃えをしつつ時刻を配列に追加
    const dayItems = []
    const dateObj = baseDate.value.clone()

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

export const useTimeLists = (props, drumPattern) => {
  const baseDate = computed(() => (
    typeof props.modelValue === 'string'
      ? dayjs(props.modelValue, dateFormat(props.type, props.format))
      : dayjs(props.modelValue)
  ).locale(props.locale ?? dayjs.locale()))
  const hourOfMin = ref(0)
  const minuteOfMin = ref(0)

  /**
   * 時配列
   *
   * @return {array}
   */
  const hours = computed(() => {
    let min = 0
    let max = constants.HOUR_UNIT

    if (props.minDate) {
      const minDate = dayjs(props.minDate)
      min = baseDate.value.isSame(minDate, 'date') ? minDate.hour() : 0
    }
    if (props.maxDate) {
      max = props.maxDate && baseDate.value.isSame(props.maxDate, 'date')
        ? dayjs(props.maxDate).hour() + 1
        : constants.HOUR_UNIT
    }

    const hours = []
    const dateObj = baseDate.value.clone()
    for (let hour = Math.min(hourOfMin.value, min); hour < max; hour++) {
      hours.push({
        name: dateObj.set('hour', hour).format(drumPattern.value.hour),
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

    if (props.minDate) {
      const minDate = dayjs(props.minDate)
      min = baseDate.value.isSame(minDate, 'hour') ? minDate.minute() : 0
    }
    if (props.maxDate) {
      max = props.maxDate && baseDate.value.isSame(props.maxDate, 'hour')
        ? dayjs(props.maxDate).minute() + 1
        : constants.MINUTE_UNIT
    }

    const interval = Number(props.minuteInterval)
    const minutes = []
    const dateObj = baseDate.value.clone()
    for (let minute = Math.min(minuteOfMin.value, min); minute < max; minute += interval) {
      minutes.push({
        name: dateObj.set('minute', minute).format(drumPattern.value.minute),
        value: minute,
      })
    }

    nextTick(() => setTimeout(() => {
      minuteOfMin.value = min
    }, 100))

    return minutes
  })

  return {
    hours,
    minutes,
  }
}
