import dayjs from '../modules/dayjs'
import { datestring } from '../modules/format-helper'
import OverlayLayer from '../components/OverlayLayer'
import PickerContainer from '../components/PickerContainer'
import ContentLayer from '../components/ContentLayer'

const disableScroll = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export default {
  props: {
    dialog: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    hideButton: { type: Boolean, default: false },
  },

  data () {
    return {
      active: false,
    }
  },

  methods: {
    generateDialogPicker (h) {
      const content = [this.generateActivator(h)]

      if (this.active) {
        // overlay
        content.push(h(OverlayLayer, {
          props: { dark: !this.hideOverlay },
          on: { click: this.offActivate },
        }))

        // picker
        const picker = h(PickerContainer, {
          props: this.$props,
          on: { click: this.offActivate },
        }, [this.pickers(h)])
        content.push(h(ContentLayer, [picker]))
      }
      return h('div', { class: ['v-drumroll-picker', 'v-drumroll-picker--dialog'] }, content)
    },

    generateActivator (h) {
      const on = {
        click: this.onActivate,
        focus: this.onActivate,
        touchend: this.onActivate,
      }

      if (this.$scopedSlots.activator) {
        return this.$scopedSlots.activator({ on })
      }

      // Fallback default
      const options = {
        class: 'v-drumroll-picker__input',
        domProps: { value: this.value },
        on: { input: this.onNativeInput, ...on },
      }
      return h('input', options)
    },

    /**
     * @param {KeyboardEvent} e
     */
    onClose (e) {
      if (e.key.toUpperCase() === 'ESCAPE') this.offActivate(e)
    },

    /**
     * @param {MouseEvent} e
     */
    onActivate (e) {
      e.preventDefault()

      // Close on ESC
      document.addEventListener('keydown', this.onClose)
      document.addEventListener('scroll', disableScroll, { passive: false })
      document.addEventListener('wheel', disableScroll, { passive: false })
      document.addEventListener('touchmove', disableScroll, { passive: false })

      // Blur active element.
      const isElement = document.activeElement instanceof HTMLElement
      if (!this.active && !this.hideOverlay && isElement) document.activeElement.blur()

      // Emit initial value
      const modelFormat = this.format || this.modelFormat
      const modelValue = this.value || this.defaultValue || dayjs().format(modelFormat)
      const initialValue = datestring(modelValue, modelFormat, this.type)
      this.$emit('input', initialValue)

      this.active = !this.active
    },

    /**
     * @param {MouseEvent|KeyboardEvent} e
     */
    offActivate (e) {
      e.preventDefault()
      document.removeEventListener('keydown', this.onClose)
      document.removeEventListener('scroll', disableScroll)
      document.removeEventListener('wheel', disableScroll)
      document.removeEventListener('touchmove', disableScroll)
      this.active = false
    },
  },
}
