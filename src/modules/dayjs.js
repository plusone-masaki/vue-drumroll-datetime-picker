import dayjs from 'dayjs'
import { jpFormat } from 'dayjs-jp-format'

dayjs.extend(jpFormat)

export default dayjs
