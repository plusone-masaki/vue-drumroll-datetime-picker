import { provide } from 'vue'

export default (props) => {
  provide('dragSensitivity', props.dragSensitivity)
  provide('touchSensitivity', props.touchSensitivity)
  provide('scrollSensitivity', props.scrollSensitivity)
}
