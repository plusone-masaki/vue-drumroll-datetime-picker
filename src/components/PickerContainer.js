const pickerCover = h => (
  h('div', { class: ['vue-scroll-picker-layer'] }, [
    h('div', { class: ['top'], ref: 'top' }),
    h('div', { class: ['middle'], ref: 'selection' }),
    h('div', { class: ['bottom'], ref: 'bottom' }),
  ])
)

export default {
  name: 'PickerContainer',
  functional: true,
  render: (h, context) => (h('div',
    { class: 'v-drumroll-picker__card' },
    [
      pickerCover(h),
      ...context.children,
      pickerCover(h),
    ],
  )),
}
