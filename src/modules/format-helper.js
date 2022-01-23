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

export const calculateWidth = str => {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    if ((chr >= 0x00 && chr < 0x81) ||
      (chr === 0xf8f0) ||
      (chr >= 0xff61 && chr < 0xffa0) ||
      (chr >= 0xf8f1 && chr < 0xf8f4)) {
      result += 0.6
    } else {
      result += 1
    }
  }

  return result
}
