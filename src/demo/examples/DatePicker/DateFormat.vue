<template>
  <!-- Date format -->
  <div id="date-picker-format" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Date format</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Auto format</div>

            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  format="DD/MM/YYYY"
/&gt;</code></pre>

            <label>Value: <input v-model="autoFormat" class="demo-input"></label>
            <date-picker
              v-model="autoFormat"
              format="DD/MM/YYYY"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Manually format</div>

            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  format="YYYY/MM/DD"
  :date-order="['date', 'month', 'year']"
/&gt;</code></pre>

            <label>Value: <input v-model="manuallyFormat" class="demo-input"></label>
            <date-picker
              v-model="manuallyFormat"
              format="YYYY/MM/DD"
              :date-order="['date', 'month', 'year']"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Custom pattern</div>

            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  align="left"
  format="YYYY-MM-DD"
  :pattern="{
    year: 'YYYY',
    month: 'MM',
    date: 'DD(ddd)',
    dividerDate: '/',
  }"
/&gt;</code></pre>

            <label>Value: <input v-model="pattern" class="demo-input"></label>
            <date-picker
              v-model="pattern"
              align="left"
              format="YYYY-MM-DD"
              :pattern="{
                year: 'YYYY',
                month: 'MM',
                date: 'DD(ddd)',
                dividerDate: '/',
              }"
            />
          </div>
        </div><!-- /column -->

        <div class="column">
          <div class="card-content">
            <div class="subtitle">Locales</div>

            <pre class="pre-code"><code class="code">// must be imported locale file before using "locale" property.
import 'dayjs/locale/de'

...

&lt;date-picker
  v-model="now"
  locale="zh"
  format="YYYY-MM-DD(ddd)"
/&gt;
</code></pre>

            <date-picker
              v-model="locale"
              locale="zh"
              :pattern="{
                year: 'YYYY',
                month: 'MM',
                date: 'DD(ddd)',
                dividerDate: '/',
              }"
            />
          </div>
        </div><!-- /column -->
      </div>
    </div>
  </div><!-- /Date format -->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DateFormat',
  data () {
    const now = dayjs()
    console.log('time', dayjs().format('L LT'))
    return {
      autoFormat: now.format('DD/MM/YYYY'),
      manuallyFormat: now.format('YYYY/MM/DD'),
      pattern: now.format('YYYY-MM-DD'),
      locale: now.format('YYYY-MM-DD'),
    }
  },
}
</script>
