<template>
  <main>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <a
            href="https://github.com/plusone-masaki/vue-drumroll-datetime-picker"
            class="has-text-white"
          >
            <h1 class="title">Vue Drumroll DateTime Picker</h1>
          </a>
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

    <footer class="has-background-dark" style="margin-top: 15vh;">
      <div class="container is-flex">
        <a class="has-text-white" href="https://www.plus-one.tech">
          &copy; Plus One
        </a>
      </div>
    </footer>
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
