export default {
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },

    onNativeInput (event) {
      this.$emit('input', event.target.value)
    },
  },
}
