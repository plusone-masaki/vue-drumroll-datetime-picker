const pickerLayer = h => (
  h('div', { class: ['vue-scroll-picker-layer'] }, [
    h('div', { class: ['top'], ref: 'top' }),
    h('div', { class: ['middle'], ref: 'selection' }),
    h('div', { class: ['bottom'], ref: 'bottom' }),
  ])
)

const cardLayer = (h, context) => (
  h('div',
    { class: 'v-drumroll-picker__card' },
    [
      pickerLayer(h),
      ...context.children,
      pickerLayer(h),
    ],
  )
)

const transitionLayer = (h, content) => (
  h('transition', {
    props: {
      name: 'v-drumroll-picker__slide-transition',
      mode: 'in-out',
      appear: true,
      duration: 300,
    },
  }, [content])
)

export default {
  name: 'ContentLayer',
  functional: true,
  render (h, context) {
    return transitionLayer(h, h('div', {
      class: 'v-drumroll-picker__content',
      on: { click: e => e.stopPropagation() },
    }, [cardLayer(h, context)]))
  },
}
