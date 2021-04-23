import ConfirmButton from '../components/ConfirmButton'

const pickerLayer = h => (
  h('div', { class: ['vue-scroll-picker-layer'] }, [
    h('div', { class: ['top'], ref: 'top' }),
    h('div', { class: ['middle'], ref: 'selection' }),
    h('div', { class: ['bottom'], ref: 'bottom' }),
  ])
)

const confirmButton = (h, { props, listeners }) => (
  !props.dialog || props.hideButton
    ? [] : [h(ConfirmButton, { on: listeners })]
)

export default {
  name: 'PickerContainer',

  functional: true,

  props: {
    dialog: { type: Boolean, default: false },
    hideButton: { type: Boolean, default: false },
  },

  render: (h, context) => (h('div',
    { class: 'v-drumroll-picker__container' },
    [
      pickerLayer(h),
      ...context.children,
      pickerLayer(h),
      ...confirmButton(h, context),
    ],
  )),
}
