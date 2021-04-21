import OverlayLayer from '@/components/OverlayLayer'
import PickerContainer from '@/components/PickerContainer'
import ContentLayer from '@/components/ContentLayer'

export default {
  props: {
    dialog: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
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
        const picker = h(PickerContainer, [this.pickers(h)])
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

    onActivate (e) {
      e.preventDefault()
      this.active = true
    },

    offActivate (e) {
      e.preventDefault()
      this.active = false
    },
  },
}
