<template>
  <!-- Dialog pickers -->
  <div id="date-picker-dialog" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Dialog pickers</div>

        <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  dialog
/&gt;</code></pre>

        <div class="has-text-centered">
          <date-picker v-model="now" dialog />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Hide overlay</div>

        <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  dialog
  hide-overlay
/&gt;</code></pre>

        <div class="has-text-centered">
          <date-picker
            v-model="now"
            dialog
            hide-overlay
          />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Scoped slot</div>

        <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  dialog
>
  &lt;template v-slot:activator="{ props }"&gt;
    &lt;button
      class="button is-primary"
      v-bind="props"
    &gt;
      {{ '\{\{ now \}\}' }}
    &lt;/button&gt;
  &lt;/template&gt;
&lt;/date-picker&gt;</code></pre>

        <div class="has-text-centered">
          <date-picker
            v-model="now"
            dialog
          >
            <template v-slot:activator="props">
              <button
                class="button is-primary"
                v-bind="props"
              >
                {{ now }}
              </button>
            </template>
          </date-picker>
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">With custom pattern</div>

        <pre class="pre-code"><code class="code">&lt;date-picker
v-model="now"
format="YYYY年MM月DD日"
dialog
:pattern="{
  year: '（rrrr年）YYYY年',
  month: 'M月',
  date: 'D日',
  dividerDate: '',
}"
/&gt;</code></pre>

        <div class="has-text-centered">
          <date-picker
            v-model="pattern"
            dialog
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
  </div><!-- /Dialog pickers -->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DialogPickers',
  data () {
    const now = dayjs()
    return {
      now: now.format('YYYY-MM-DD'),
      pattern: now.format('YYYY-MM-DD'),
    }
  },
}
</script>
