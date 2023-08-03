import { h, Transition } from 'vue'

const OverlayLayer = {
  name: 'OverlayLayer',
  props: {
    dark: { type: Boolean, default: false },
    leaving: { type: Boolean, default: false },
    onClick: { type: Function, default: () => {} },
  },
  setup: (props, { emit }) => () => {
    const overlay = h('div', {
      class: [
        'v-drumroll-picker__overlay',
        {
          'v-drumroll-picker__fade-transition-leave-active': props.leaving,
          'v-drumroll-picker__fade-transition-leave-to': props.leaving,
        },
        props.dark ? '--dark' : '',
      ],
      onClick: props.onClick,
    })
    return h(Transition, {
      name: 'v-drumroll-picker__fade-transition',
      appear: true,
      duration: 300,
    }, () => [overlay])
  },
}

export default OverlayLayer
