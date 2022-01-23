<template>
  <!-- Other options -->
  <div id="time-picker-options" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Other options</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Minute intervals</div>

            <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  type="time"
  minute-interval="30"
/&gt;</code></pre>

            <label>Value: <input v-model="intervals" class="demo-input"></label>
            <time-picker
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
            <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  height="4em"
/&gt;</code></pre>

            <label>Value: <input v-model="height" class="demo-input"></label>
            <time-picker
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
