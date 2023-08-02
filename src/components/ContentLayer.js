import { h } from 'vue'

const transitionLayer = (content) => () => (
  h('transition', {
    name: 'v-drumroll-picker__slide-transition',
    mode: 'in-out',
    appear: true,
    duration: 300,
  }, [content])
)

const ContentLayer = {
  name: 'ContentLayer',
  setup: (_, { slots }) => (
    transitionLayer(h('div', {
      class: 'v-drumroll-picker__content',
      onClick: e => e.stopPropagation(),
    }, [slots.default()]))
  ),
}

export default ContentLayer
