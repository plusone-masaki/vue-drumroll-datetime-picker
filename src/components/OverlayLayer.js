import { h } from 'vue'

const OverlayLayer = {
  name: 'OverlayLayer',
  props: {
    dark: { type: Boolean, default: false },
    onClick: { type: Function, default: () => {} },
  },
  setup: (props, { emit }) => () => h('div', {
    class: [
      'v-drumroll-picker__overlay',
      props.dark ? '--dark' : '',
    ],
    onClick: props.onClick,
  }),
}

export default OverlayLayer
