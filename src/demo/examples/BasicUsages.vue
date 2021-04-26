<template>
  <!-- Basic usages -->
  <div id="basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Basic usages</div>

        <pre class="pre-code"><code class="code">&lt;date-time-picker v-model="now" height="8em" /&gt;</code></pre>

        <label>Value: <input v-model="now" class="demo-input"></label>
        <date-time-picker v-model="now" height="8em" />
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

            <label>Value: <input v-model="now" class="demo-input"></label>
            <date-time-picker v-model="now" type="date" />
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

            <label>Value: <input v-model="now" class="demo-input"></label>
            <date-time-picker v-model="now" type="time" />
          </div>
        </div>

      </div>
    </div>
  </div><!-- /Basic usages -->
</template>

<script>
export default {
  name: 'BasicUsages',
  data () {
    return {
      now: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
}
</script>
