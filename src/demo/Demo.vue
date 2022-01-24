<template>
  <div>
    <header class="hero is-primary">
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
      <div class="hero-foot">
        <nav class="tabs is-boxed is-right">
          <div class="container">
            <ul>
              <li><a href="https://www.plus-one.tech">Author's website</a></li>
              <li><a href="https://github.com/plusone-masaki/vue-drumroll-datetime-picker">GitHub</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <!-- Picker select -->
    <main class="container">
      <div class="columns column is-sticky is-10 is-offset-1 is-mobile mr-0 my-0 pb-0">
        <div class="column is-one-third-mobile">
          <button
            class="button is-fullwidth is-primary"
            :class="{ 'is-outlined': type !== 'datetime' }"
            @click="type = 'datetime'"
          >
            DateTimePicker
          </button>
        </div>
        <div class="column is-one-third-mobile">
          <button
            class="button is-fullwidth is-primary"
            :class="{ 'is-outlined': type !== 'date' }"
            @click="type = 'date'"
          >
            DatePicker
          </button>
        </div>
        <div class="column is-one-third-mobile">
          <button
            class="button is-fullwidth is-primary"
            :class="{ 'is-outlined': type !== 'time' }"
            @click="type = 'time'"
          >
            TimePicker
          </button>
        </div>
      </div><!-- /Picker select -->

      <!-- DateTimePicker Examples -->
      <section v-if="type === 'datetime'">
        <date-time-picker-getting-started />
        <date-time-picker-basic-usages />
        <date-time-picker-date-format />
        <date-time-picker-dialog-pickers />
        <date-time-picker-other-options />
      </section>

      <!-- DatePicker Examples -->
      <section v-if="type === 'date'">
        <date-picker-getting-started />
        <date-picker-basic-usages />
        <date-picker-date-format />
        <date-picker-dialog-pickers />
        <date-picker-other-options />
      </section>

      <!-- TimePicker Examples -->
      <section v-if="type === 'time'">
        <time-picker-getting-started />
        <time-picker-basic-usages />
        <time-picker-time-format />
        <time-picker-dialog-pickers />
        <time-picker-other-options />
      </section>
    </main>

    <footer class="has-background-dark" style="margin-top: 15vh;">
      <div class="container is-flex">
        <a class="has-text-white" href="https://www.plus-one.tech">
          Plus One
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import dayjs from 'dayjs'
import DateTimePickerGettingStarted from './examples/DateTimePicker/GettingStarted'
import DateTimePickerBasicUsages from './examples/DateTimePicker/BasicUsages'
import DateTimePickerDialogPickers from './examples/DateTimePicker/DialogPickers'
import DateTimePickerDateFormat from './examples/DateTimePicker/DateFormat'
import DateTimePickerOtherOptions from './examples/DateTimePicker/OtherOptions'
import DatePickerGettingStarted from './examples/DatePicker/GettingStarted'
import DatePickerBasicUsages from './examples/DatePicker/BasicUsages'
import DatePickerDialogPickers from './examples/DatePicker/DialogPickers'
import DatePickerDateFormat from './examples/DatePicker/DateFormat'
import DatePickerOtherOptions from './examples/DatePicker/OtherOptions'
import TimePickerGettingStarted from './examples/TimePicker/GettingStarted'
import TimePickerBasicUsages from './examples/TimePicker/BasicUsages'
import TimePickerDialogPickers from './examples/TimePicker/DialogPickers'
import TimePickerTimeFormat from './examples/TimePicker/TimeFormat'
import TimePickerOtherOptions from './examples/TimePicker/OtherOptions'

export default {
  name: 'App',
  components: {
    DateTimePickerGettingStarted,
    DateTimePickerBasicUsages,
    DateTimePickerDateFormat,
    DateTimePickerDialogPickers,
    DateTimePickerOtherOptions,

    DatePickerGettingStarted,
    DatePickerBasicUsages,
    DatePickerDateFormat,
    DatePickerDialogPickers,
    DatePickerOtherOptions,

    TimePickerGettingStarted,
    TimePickerBasicUsages,
    TimePickerDialogPickers,
    TimePickerTimeFormat,
    TimePickerOtherOptions,
  },
  data: () => ({
    now: dayjs().format('YYYY-MM-DD HH:mm'),
    type: 'datetime',
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
  overflow-x: auto

.pre-code
  background: inherit
  color: inherit
  font-size: inherit
  margin-bottom: 16px
  overflow: hidden
  padding: 0

.demo-input
  border: 1px solid #ccc
  border-radius: 4px
  font-size: 16px
  padding: .25em .5em

.is-sticky
  background: rgba(255, 255, 255, 0.9)
  position: sticky
  top: 0
  z-index: 2
</style>
