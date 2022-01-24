export default {
  name: 'DrumDivider',

  functional: true,

  props: {
    divider: { type: String, required: true },
  },

  render (h, { props }) {
    return h('span', { class: 'v-drumroll-picker__divider -selected' }, [props.divider])
  },
}
