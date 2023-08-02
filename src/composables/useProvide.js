import { provide } from 'vue'

export default (props) => {
  provide('dragSensitivity', props.dragSensitivity)
  provide('touchSensitivity', props.touchSensitivity)
  provide('scrollSensitivity', props.scrollSensitivity)
  provide('align', props.align)
  provide('defaultValue', props.defaultValue)
  provide('pattern', props.pattern)
  provide('format', props.format)
}
