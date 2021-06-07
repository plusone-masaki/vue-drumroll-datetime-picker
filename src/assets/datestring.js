import dayjs from 'dayjs'

/**
 * Format date string
 *
 * @param {string|number|Date} value
 * @param {string|undefined} modelFormat
 * @param {string} type
 * @return {string|undefined}
 */
export default (value, modelFormat, type) => {
  if (!value) return undefined

  const baseFormat = '^' + modelFormat
    .replace(/(Aa|M{3,4}|d{2,4})/g, '[\\u\\l]+?')
    .replace(/([YMDHms])/g, '\\d')
  const format = new RegExp(baseFormat)
  if (format.test(value)) {
    if (dayjs(value, modelFormat).isValid()) {
      return value
    } else if (type === 'time' && typeof value === 'string') {
      const datetime = `1900-01-01 ${value}`
      const date = dayjs(datetime, `YYYY-MM-DD ${modelFormat}`)
      return date.isValid() ? datetime : undefined
    }
    return undefined
  } else {
    return undefined
  }
}
