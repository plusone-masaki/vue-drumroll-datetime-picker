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

        <div class="column">
          <div class="card-content">
            <div class="subtitle">Locales</div>

            <pre class="pre-code"><code class="code">// must be imported locale file before using "locale" property.
import 'dayjs/locale/ja'

...

&lt;date-time-picker
  v-model="now"
  locale="ja"
  :pattern="{
    year: '（rrrr年）YYYY年',
    month: 'MMM',
    date: 'DD日(ddd)',
    hour: 'HH時',
    minute: 'mm分',
    dividerDate: '',
    dividerTime: ''
  }"
/&gt;
</code></pre>

            <date-time-picker
              v-model="locale"
              locale="ja"
              :pattern="{
                year: '（rrrr年）YYYY年',
                month: 'MMM',
                date: 'DD日(ddd)',
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
  </div><!-- /Time format -->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'TimeFormat',
  data () {
    const now = dayjs()
    return {
      autoFormat: now.format('HH.mm'),
      pattern: now.format('HH:mm'),
      locale: now.format('HH:mm'),
    }
  },
}
</script>
