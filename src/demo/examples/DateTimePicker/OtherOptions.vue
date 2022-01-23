<template>
  <!-- Other options -->
  <div id="date-time-picker-options" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Other options</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Min date / Max date</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  min-date="2020-05-10 12:03"
  max-date="2036-10-20 20:06"
/&gt;</code></pre>

            <label>Value: <input v-model="range" class="demo-input"></label>
            <date-time-picker
              v-model="range"
              min-date="2020-05-10 12:03"
              max-date="2036-10-20 20:06"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Minute intervals</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="time"
  minute-interval="30"
/&gt;</code></pre>

            <label>Value: <input v-model="intervals" class="demo-input"></label>
            <date-time-picker
              v-model="intervals"
              type="time"
              minute-interval="30"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Height</div>

            <p class="has-text-grey mb-2">Width is calculated automatically.</p>
            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  height="4em"
/&gt;</code></pre>

            <label>Value: <input v-model="height" class="demo-input"></label>
            <date-time-picker
              v-model="height"
              height="4em"
            />
          </div>
        </div><!-- /column -->
      </div>
    </div>
  </div><!-- /Other options -->
</template>

<script>
export default {
  name: 'OtherOptions',
  data () {
    const now = this.$dayjs()
    return {
      range: now.format('YYYY-MM-DD HH:mm'),
      intervals: now.format('YYYY-MM-DD HH:mm'),
      height: now.format('YYYY-MM-DD HH:mm'),
    }
  },
}
</script>
