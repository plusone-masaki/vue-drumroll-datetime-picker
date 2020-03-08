export default {
  name: 'OverlayLayer',
  functional: true,
  render (h, context) {
    return h('div', {
      class: 'v-drumroll-picker__overlay',
      on: {
        click: context.listeners.click,
      },
    })
  },
}
