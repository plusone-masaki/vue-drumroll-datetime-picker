import { h, Transition } from 'vue'

const PickerDialog = {
  name: 'PickerDialog',
  props: {
    leaving: { type: Boolean, default: false },
  },
  setup: (props, { slots }) => () => {
    const content = h('div', {
      class: [
        'v-drumroll-picker__dialog',
        {
          'v-drumroll-picker__slide-transition-leave-active': props.leaving,
          'v-drumroll-picker__slide-transition-leave-to': props.leaving,
        }],
      onClick: e => e.stopPropagation(),
    }, [slots.default()])

    return (
      h(Transition, {
        name: 'v-drumroll-picker__slide-transition',
        appear: true,
        duration: 300,
      }, [content])
    )
  },
}

export default PickerDialog
