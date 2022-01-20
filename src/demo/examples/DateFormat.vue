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
            <div class="subtitle">Change drum order and divider</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="DD/MM/YYYY"
/&gt;</code></pre>

            <label>Value: <input v-model="changeDrum" class="demo-input"></label>
            <date-time-picker
              v-model="changeDrum"
              type="date"
              format="DD/MM/YYYY"
            />
          </div>
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Format</div>

            <pre class="pre-code"><code class="code">&lt;date-time-picker
  v-model="now"
  type="date"
  format="YYYY年MM月DD日"
  :pattern="{
    year: '（rrrr年）YYYY年',
    month: 'M月',
    date: 'D日',
    dividerDate: '',
  }"
/&gt;</code></pre>

            <label>Value: <input v-model="format" class="demo-input"></label>
            <date-time-picker
              v-model="format"
              type="date"
              format="YYYY年MM月DD日"
              :pattern="{
                year: '（rrrr年）YYYY年',
                month: 'M月',
                date: 'D日',
                dividerDate: '',
              }"
            />
          </div>
        </div>
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
      changeDrum: now.format('DD/MM/YYYY HH:mm'),
      format: now.format('YYYY年MM月DD日'),
      intervals: now.format('YYYY-MM-DD HH:mm'),
    }
  },
}
</script>
