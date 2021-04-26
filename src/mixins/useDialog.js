import OverlayLayer from '../components/OverlayLayer'
import PickerContainer from '../components/PickerContainer'
import ContentLayer from '../components/ContentLayer'

export default {
  props: {
    dialog: { type: Boolean, default: false },
    height: { type: [String, Number], default: undefined },
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
        attrs: { value: this.value },
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

      // Blur active element.
      const isElement = document.activeElement instanceof HTMLElement
      if (!this.active && !this.hideOverlay && isElement) document.activeElement.blur()

      this.active = !this.active
    },

    /**
     * @param {MouseEvent|KeyboardEvent} e
     */
    offActivate (e) {
      e.preventDefault()
      document.removeEventListener('keydown', this.onClose)
      this.active = false
    },
  },
}
