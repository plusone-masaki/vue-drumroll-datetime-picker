export default {
  props: {
    value: { type: [String, Number, Date], default: undefined },
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },

    onNativeInput (event) {
      this.$emit('input', event.target.value)
    },
  },
}
