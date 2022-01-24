<template>
  <!-- Date format -->
  <div id="date-time-picker-format" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Date format</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Auto format</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="DD/MM/YYYY"
/&gt;</code></pre>

            <label>Value: <input v-model="autoFormat" class="demo-input"></label>
            <date-time-picker
              v-model="autoFormat"
              type="date"
              format="DD/MM/YYYY"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Manually format</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="YYYY/MM/DD"
  :date-order="['date', 'month', 'year']"
/&gt;</code></pre>

            <label>Value: <input v-model="manuallyFormat" class="demo-input"></label>
            <date-time-picker
              v-model="manuallyFormat"
              type="date"
              format="YYYY/MM/DD"
              :date-order="['date', 'month', 'year']"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Custom pattern</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  format="YYYY年MM月DD日"
  :pattern="{
    year: '（rrrr年）YYYY年',
    month: 'M月',
    date: 'D日',
    hour: 'HH時',
    minute: 'mm分',
    dividerDate: '',
    dividerTime: ''
  }"
/&gt;</code></pre>

            <label>Value: <input v-model="pattern" class="demo-input"></label>
            <date-time-picker
              v-model="pattern"
              format="YYYY年MM月DD日 HH時mm分"
              :pattern="{
                year: '（rrrr年）YYYY年',
                month: 'M月',
                date: 'D日',
                hour: 'HH時',
                minute: 'mm分',
                dividerDate: '',
                dividerTime: ''
              }"
            />
          </div>
        </div><!-- /column -->
      </div>
    </div>
  </div><!-- /Date format -->
</template>

<script>
export default {
  name: 'DateFormat',
  data () {
    const now = this.$dayjs()
    return {
      autoFormat: now.format('DD/MM/YYYY HH:mm'),
      manuallyFormat: now.format('YYYY/MM/DD HH:mm'),
      pattern: now.format('YYYY年MM月DD日 HH時mm分'),
    }
  },
}
</script>
