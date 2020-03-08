const pickerLayer = h => (
  h('div', { class: ['vue-scroll-picker-layer'] }, [
    h('div', { class: ['top'], ref: 'top' }),
    h('div', { class: ['middle'], ref: 'selection' }),
    h('div', { class: ['bottom'], ref: 'bottom' }),
  ])
)

const cardLayer = (h, context) => (
  h(
    'div',
    { class: 'v-drumroll-picker__card' },
    [
      pickerLayer(h),
      ...context.children,
      pickerLayer(h),
    ],
  )
)

export default {
  name: 'ContentLayer',
  functional: true,
  render (h, context) {
    return h(
      'div',
      {
        class: 'v-drumroll-picker__content',
        on: {
          click: e => e.stopPropagation(),
        },
      },
      [cardLayer(h, context)],
    )
  },
}
