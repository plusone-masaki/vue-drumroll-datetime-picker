export default {
  name: 'DrumrollSeparator',

  functional: true,

  props: {
    separator: { type: String, required: true },
  },

  render (h, { props }) {
    return h('span', { class: 'v-drumroll-picker__separator -selected' }, [props.separator])
  },
}
