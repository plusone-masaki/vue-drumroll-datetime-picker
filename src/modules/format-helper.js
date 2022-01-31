import dayjs from './dayjs'

export const match = (pattern, format, index = 0) => {
  const match = format.match(pattern)
  return match ? match[index] : ''
}

export const calculatePattern = format => {
  return {
    year: match(/Y+/, format),
    month: match(/M+/, format),
    date: match(/D+/, format),
    hour: match(/H+/i, format),
    minute: match(/m+/, format),
    dividerDate: match(/[YMD]+([^YMD]*)[YMD]+/, format, 1),
    dividerTime: match(/[Hms]+([^Hms]*)[Hms]+/, format, 1),
  }
}

/**
 * @param {string} baseFormat
 * @return {array}
 */
export const guessDateOrder = (baseFormat) => {
  return [
    { type: 'year', index: baseFormat.indexOf('Y') },
    { type: 'month', index: baseFormat.indexOf('M') },
    { type: 'date', index: baseFormat.indexOf('D') },
  ]
    .sort((a, b) => a.index - b.index)
    .map(item => item.type)
}

/**
 * Format date string
 *
 * @param {string|number|Date} value
 * @param {string|undefined} modelFormat
 * @param {string} type
 * @return {string|undefined}
 */
export const datestring = (value, modelFormat, type) => {
  if (!value) return undefined

  const baseFormat = '^' + modelFormat
    .replace(/(Aa|M{3,4}|d{2,4})/g, '[\\u\\l]+?')
    .replace(/([YMDHms])/g, '\\d')
  const format = new RegExp(baseFormat)
  if (format.test(value)) {
    const modelValue = dayjs(value, modelFormat)
    if (modelValue.isValid()) {
      return modelValue.format(modelFormat)
    } else if (type === 'time' && typeof value === 'string') {
      const datetime = `1980-01-01 ${value}`
      const date = dayjs(datetime, `YYYY-MM-DD ${modelFormat}`)
      return date.isValid() ? datetime : undefined
    }
    return undefined
  } else {
    return undefined
  }
}
