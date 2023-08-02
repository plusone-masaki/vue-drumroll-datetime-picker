import { h } from 'vue'
import ConfirmButton from '../components/ConfirmButton'

const pickerLayer = () => (
  h('div', { class: ['vue-scroll-picker-layer'] }, [
    h('div', { class: ['vue-scroll-picker-layer-top'], ref: 'top' }),
    h('div', { class: ['vue-scroll-picker-layer-selection'], ref: 'selection' }),
    h('div', { class: ['vue-scroll-picker-layer-bottom'], ref: 'bottom' }),
  ])
)

const confirmButton = (props, { emit }) => (
  !props.dialog || props.hideButton
    ? []
    : [h(ConfirmButton, { onClick: e => emit('click', e) })]
)

const PickerContainer = {
  name: 'PickerContainer',
  props: {
    dialog: { type: Boolean, default: false },
    height: { type: [Number, String], default: '10em' },
    hideButton: { type: Boolean, default: false },
  },

  setup: (props, context) => () => h('div',
    {
      class: 'v-drumroll-picker__container',
      style: {
        height: /^\d+$/.test(props.height)
          ? props.height + 'px'
          : props.height,
      },
    },
    [
      pickerLayer(),
      ...context.slots.default(),
      ...confirmButton(props, context),
    ],
  ),
}

export default PickerContainer
