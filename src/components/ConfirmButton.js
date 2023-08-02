import { h } from 'vue'
import { mdiCheckBold } from '@mdi/js'

const ConfirmButton = {
  name: 'ConfirmButton',
  props: {
    size: { type: [Number, String], default: 24 },
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
      [h('path', {
        attrs: { d: mdiCheckBold },
      })],
    )

    return h('button', {
      class: ['v-drumroll-picker__button'],
      on: emit,
    }, [icon])
  },
}

export default ConfirmButton
