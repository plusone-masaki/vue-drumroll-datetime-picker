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
    }, context.children))
  },
}
