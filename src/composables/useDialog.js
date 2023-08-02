import { h, ref } from 'vue'
import dayjs from '../modules/dayjs'
import { dateFormat, datestring } from '../modules/format-helper'
import OverlayLayer from '../components/OverlayLayer'
import PickerContainer from '../components/PickerContainer'
import ContentLayer from '../components/ContentLayer'

const disableScroll = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export default (type, props, context) => {
  const active = ref(false)

  /**
   * @param {KeyboardEvent} e
   */
  const onClose = (e) => {
    if (e.key.toUpperCase() === 'ESCAPE') offActivate(e)
  }

  const onNativeInput = (event) => {
    const value = datestring(event.target.value, props.format || dateFormat(type), type)
    if (value) this.modelValue = value
  }

  const onActivate = (e) => {
    e.preventDefault()

    // Close on ESC
    document.addEventListener('keydown', onClose)
    document.addEventListener('scroll', disableScroll, { passive: false })
    document.addEventListener('wheel', disableScroll, { passive: false })
    document.addEventListener('touchmove', disableScroll, { passive: false })

    // Blur active element.
    const isElement = document.activeElement instanceof HTMLElement
    if (!active.value && !props.hideOverlay && isElement) document.activeElement.blur()

    // Emit initial value
    const modelValue = props.modelValue || this.defaultValue || dayjs().format(dateFormat)
    const initialValue = datestring(modelValue, props.format || dateFormat(type), type)
    context.emit('update:modelValue', initialValue)

    active.value = true
  }
  /**
   * @param {MouseEvent|KeyboardEvent} e
   */
  const offActivate = (e) => {
    e.preventDefault()
    document.removeEventListener('keydown', onClose)
    document.removeEventListener('scroll', disableScroll)
    document.removeEventListener('wheel', disableScroll)
    document.removeEventListener('touchmove', disableScroll)
    active.value = false
  }

  const generateActivator = () => {
    const on = {
      onClick: onActivate,
      onFocus: onActivate,
      onTouchend: onActivate,
    }

    if (context.slots.activator) {
      return context.slots.activator(on)
    }

    // Fallback default
    const options = {
      class: 'v-drumroll-picker__input',
      value: props.modelValue,
      onInput: onNativeInput,
      ...on,
    }
    return h('input', options)
  }

  const generateDialogPicker = (pickers) => () => {
    const content = [generateActivator()]

    if (active.value) {
      // overlay
      content.push(h(OverlayLayer, {
        dark: !props.hideOverlay,
        onClick: offActivate,
      }))

      // picker
      const picker = h(PickerContainer, props, pickers)
      content.push(h(ContentLayer, [picker]))
    }
    return h('div', { class: ['v-drumroll-picker', 'v-drumroll-picker--dialog'] }, content)
  }

  return {
    generateActivator,
    generateDialogPicker,
  }
}
