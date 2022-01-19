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
    second: match(/s+/, format),
    'divider-date': match(/[YMD]+([^YMD]*)[YMD]+/, format, 1),
    'divider-time': match(/[Hms]+([^Hms]*)[Hms]+/, format, 1),
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
