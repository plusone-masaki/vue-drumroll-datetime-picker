import { h, ref } from 'vue'
import { dateFormat, datestring } from '../modules/format-helper'
import OverlayLayer from '../components/OverlayLayer'
import PickerContainer from '../components/PickerContainer'
import PickerDialog from '../components/PickerDialog'

const disableScroll = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export default (type, props, context) => {
  const active = ref(false)
  const leaving = ref(false)

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
    leaving.value = true
    setTimeout(() => {
      active.value = false
      leaving.value = false
    }, 300)
  }

  const generateActivator = () => {
    const listeners = {
      onClick: onActivate,
      onFocus: onActivate,
      onTouchend: onActivate,
    }

    if (context.slots.activator) {
      return context.slots.activator(listeners)
    }

    // Fallback default
    const options = {
      class: 'v-drumroll-picker__input',
      value: props.modelValue,
      onInput: onNativeInput,
      ...listeners,
    }
    return [h('input', options)]
  }

  const generateDialogPicker = (pickers) => {
    const contents = generateActivator()

    if (active.value) {
      // overlay
      contents.push(h(OverlayLayer, {
        dark: !props.hideOverlay,
        leaving: leaving.value,
        onClick: offActivate,
      }))

      // picker
      const picker = h(PickerContainer, { ...props, onClick: offActivate }, pickers)
      contents.push(h(PickerDialog, { leaving: leaving.value }, () => [picker]))
    }
    return h('div', { class: ['v-drumroll-picker', 'v-drumroll-picker__activator'] }, contents)
  }

  return {
    generateActivator,
    generateDialogPicker,
  }
}
