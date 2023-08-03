import { h } from 'vue'
import { mdiCheckBold } from '@mdi/js'

const ConfirmButton = {
  name: 'ConfirmButton',
  props: {
    size: { type: [Number, String], default: 24 },
    onClick: { type: Function, default: () => {} },
  },
  setup: (props, { emit }) => () => {
    const icon = h('svg',
      {
        class: ['v-drumroll-picker__button--icon'],
        style: {
          height: `${props.size}px`,
          width: `${props.size}px`,
        },
        attrs: {
          viewBox: '0 0 24 24',
        },
      },
      [h('path', { d: mdiCheckBold })],
    )

    return h('button', {
      class: ['v-drumroll-picker__button'],
      onClick: props.onClick,
    }, [icon])
  },
}

export default ConfirmButton
