export default {
  name: 'OverlayLayer',
  functional: true,
  props: {
    dark: { type: Boolean, default: false },
  },
  render (h, context) {
    return h('div', {
      class: [
        'v-drumroll-picker__overlay',
        context.props.dark ? '--dark' : '',
      ],
      on: {
        click: context.listeners.click,
      },
    })
  },
}
