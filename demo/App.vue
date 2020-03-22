<template>
  <main style="margin-bottom: 15vh;">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Vue Drumroll DateTime Picker</h1>
          <h2 class="subtitle">Demo Page</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <!-- Examples -->
      <basic-usages />
      <dialog-pickers />
      <other-options />
      <!-- /Examples -->
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs'
import BasicUsages from './examples/BasicUsages'
import DialogPickers from './examples/DialogPickers'
import OtherOptions from './examples/OtherOptions'

export default {
  name: 'App',
  components: {
    BasicUsages,
    DialogPickers,
    OtherOptions,
  },
  data: () => ({
    now: dayjs().format('YYYY-MM-DD HH:mm'),
  }),
}
</script>

<style lang="sass">
.code
  background-color: #282c34
  border-radius: 4px
  color: #fff
  display: block
  padding: .5em 1em
  margin-bottom: 1rem

  .pre-code
    background: inherit
    color: inherit
    font-size: inherit
    padding: 0

.demo-input
  border: 1px solid #ccc
  border-radius: 4px
  font-size: 16px
  padding: .25em .5em
</style>
