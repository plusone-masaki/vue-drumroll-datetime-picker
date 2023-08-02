import { h } from 'vue'

const DrumDivider = {
  name: 'DrumDivider',
  props: {
    divider: { type: String, required: true },
  },

  setup: ({ divider }) => () => (
    h('span', { class: 'v-drumroll-picker__divider -selected' }, [divider])
  ),
}

export default DrumDivider
