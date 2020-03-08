<template>
  <div id="app">
    <div class="timepicker-container">
      <DateTimePicker v-model="time" type="datetime" minute-interval="5" />
    </div>
  </div>
</template>

<script>
import DateTimePicker from './pickers/DateTimePicker'

export default {
  name: 'App',
  components: {
    DateTimePicker,
  },
  data () {
    return {
      date: 10,
      time: '2020-02-22 22:25',
      options: {
        dragSensitivity: 1.7,
        touchSensitivity: 1.7,
        scrollSensitivity: 0.8,
      },
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.timepicker-container {
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  padding-top: 30vh;
  height: 50vh;
  width: 100%;
}
</style>
