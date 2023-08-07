import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { jpFormat } from 'dayjs-jp-format'

dayjs.extend(customParseFormat)
dayjs.extend(jpFormat)

export default async (locale) => {
  if (locale) {
    const localeData = await import(`dayjs/locale/${locale}.js`)
    dayjs.locale(localeData)
  }
  return dayjs
}
