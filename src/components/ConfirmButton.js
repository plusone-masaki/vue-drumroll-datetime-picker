import { mdiCheckBold } from '@mdi/js'

export default {
  name: 'ConfirmButton',

  functional: true,

  props: {
    size: { type: [Number, String], default: 24 },
  },

  render (h, { props, listeners }) {
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
      on: { ...listeners },
    }, [icon])
  },
}
