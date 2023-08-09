import dayjs from './dayjs'

export const dateFormat = (type, format) => {
  if (format) return format
  switch (type) {
    case 'datetime': return 'YYYY-MM-DD HH:mm'
    case 'date': return 'YYYY-MM-DD'
    case 'time': return 'HH:mm'
    default: throw new Error('Invalid property. "type" is only allow "datetime/date/time".')
  }
}

export const match = (pattern, format, index = 0) => {
  const match = format.match(pattern)
  return match ? match[index] : ''
}

export const calculatePattern = format => ({
  year: match(/Y+/, format),
  month: match(/M+/, format),
  date: match(/D+/, format),
  hour: match(/H+/i, format),
  minute: match(/m+/, format),
  dividerDate: match(/[YMD]+([^YMD]*)[YMD]+/, format, 1),
  dividerTime: match(/[Hms]+([^Hms]*)[Hms]+/, format, 1),
})

/**
 * @param {string} baseFormat
 * @return {array}
 */
export const guessDateOrder = (baseFormat) => (
  [
    { type: 'year', index: baseFormat.indexOf('Y') },
    { type: 'month', index: baseFormat.indexOf('M') },
    { type: 'date', index: baseFormat.indexOf('D') },
  ]
    .sort((a, b) => a.index - b.index)
    .map(item => item.type)
)

/**
 * Format date string
 *
 * @param {string|number|Date} value
 * @param {string|undefined} dateFormat
 * @param {string} type
 * @return {string|undefined}
 */
export const datestring = (value, dateFormat, type) => {
  let modelValue
  if (typeof value === 'number') {
    modelValue = dayjs.unix(value)
  } else if (typeof value === 'string') {
    modelValue = dayjs(value, dateFormat)
  } else {
    modelValue = dayjs(value)
  }

  if (modelValue.isValid()) {
    return modelValue.format(dateFormat)
  } else if (type === 'time' && typeof value === 'string') {
    const datetime = `1980-01-01 ${value}`
    const date = dayjs(datetime, `YYYY-MM-DD ${dateFormat}`)
    return date.isValid() ? datetime : undefined
  }
}
