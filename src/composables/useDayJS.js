import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { jpFormat } from 'dayjs-jp-format'

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(jpFormat)

export default () => {
  return dayjs
}
