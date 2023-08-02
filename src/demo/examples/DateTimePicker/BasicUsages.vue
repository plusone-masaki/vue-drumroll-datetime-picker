<template>
  <!-- Basic usages -->
  <div id="date-time-picker-basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Basic usages</div>

        <pre class="pre-code"><code class="code">&lt;date-time-picker v-model="now" /&gt;</code></pre>

        <label>Value: <input v-model="datetime" class="demo-input"></label>
        <date-time-picker v-model="datetime" />
      </div>

      <div class="columns is-gapless">

        <!-- Date picker -->
        <div class="column">
          <div class="card-content">
            <div class="subtitle">Date picker</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
/&gt;</code></pre>

            <label>Value: <input v-model="date" class="demo-input"></label>
            <date-time-picker v-model="date" type="date" />
          </div>
        </div>

        <!-- Time picker -->
        <div class="column">
          <div class="card-content">
            <div class="subtitle">Time picker</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="time"
/&gt;</code></pre>

            <label>Value: <input v-model="time" class="demo-input"></label>
            <date-time-picker v-model="time" type="time" />
          </div>
        </div>

      </div>
    </div>
  </div><!-- /Basic usages -->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'BasicUsages',
  data () {
    return {
      datetime: dayjs().format('YYYY-MM-DD HH:mm'),
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),
    }
  },
}
</script>
