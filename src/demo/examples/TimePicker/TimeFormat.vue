<template>
  <!-- Time format -->
  <div id="time-picker-format" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Time format</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Auto format</div>

            <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  format="HH.mm"
/&gt;</code></pre>

            <label>Value: <input v-model="autoFormat" class="demo-input"></label>
            <time-picker
              v-model="autoFormat"
              type="date"
              format="HH.mm"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Custom pattern</div>

            <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  format="HH:mm"
  :pattern="{
    hour: 'A hh',
    minute: 'mm',
    dividerTime: ','
  }"
/&gt;</code></pre>

            <label>Value: <input v-model="pattern" class="demo-input"></label>
            <time-picker
              v-model="pattern"
              format="HH:mm"
              :pattern="{
                hour: 'A hh',
                minute: 'mm',
                dividerTime: ','
              }"
            />
          </div>
        </div><!-- /column -->
      </div>
    </div>
  </div><!-- /Time format -->
</template>

<script>
export default {
  name: 'TimeFormat',
  data () {
    const now = this.$dayjs()
    return {
      autoFormat: now.format('HH.mm'),
      pattern: now.format('HH:mm'),
    }
  },
}
</script>
