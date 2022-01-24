import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { jpFormat } from 'dayjs-jp-format'

dayjs.extend(customParseFormat)
dayjs.extend(jpFormat)

export default dayjs
