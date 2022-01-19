<template>
  <!-- Other options -->
  <div id="options" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Date format</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">String format</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="YYYY/MM/DD"
/&gt;</code></pre>

            <label>Value: <input v-model="stringFormat" class="demo-input"></label>
            <date-time-picker
              v-model="stringFormat"
              type="date"
              format="YYYY/MM/DD"
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
              format="YYYY年MM月DD日"
            />
          </div>
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Minute intervals</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="time"
  format="YYYY年MM月DD日"
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
  name: 'DateFormat',
  data () {
    const now = this.$dayjs()
    return {
      stringFormat: now.format('YYYY/MM/DD HH:mm'),
      format: now.format('YYYY年MM月DD日'),
      intervals: now.format('YYYY-MM-DD HH:mm'),
    }
  },
}
</script>
