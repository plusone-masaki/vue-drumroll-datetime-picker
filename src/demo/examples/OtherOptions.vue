<template>
  <!-- Other options -->
  <div id="options" class="column is-10 is-offset-1">
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
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Format</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="YYYY-MM-DD"
/&gt;</code></pre>

            <label>Value: <input v-model="format" class="demo-input"></label>
            <date-time-picker
              v-model="format"
              type="date"
              format="YYYY-MM-DD"
            />
          </div>
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Minute intervals</div>

            <pre class="pre-code"><code class="code">
&lt;date-time-picker
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
        </div>
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
      format: now.format('YYYY-MM-DD'),
      intervals: now.format('YYYY-MM-DD HH:mm'),
    }
  },
}
</script>
