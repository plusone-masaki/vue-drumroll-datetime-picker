<template>
  <!-- Other options -->
  <div id="date-picker-options" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Other options</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Min date / Max date</div>

            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  min-date="2020-05-10"
  max-date="2036-10-20"
/&gt;</code></pre>

            <label>Value: <input v-model="range" class="demo-input"></label>
            <date-picker
              v-model="range"
              min-date="2020-05-10"
              max-date="2036-10-20"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Height</div>

            <p class="has-text-grey mb-2">Width is calculated automatically.</p>
            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  height="4em"
/&gt;</code></pre>

            <label>Value: <input v-model="height" class="demo-input"></label>
            <date-picker
              v-model="height"
              height="4em"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Alignment</div>

            <pre class="pre-code"><code class="code">&lt;date-picker
  v-model="now"
  align="left"
/&gt;</code></pre>

            <label>Value: <input v-model="align" class="demo-input"></label>
            <date-picker
              v-model="align"
              align="left"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Font size</div>

            <pre class="pre-code"><code class="code">&lt;div style="font-size: 21px"&gt;
  &lt;date-picker v-model="now" /&gt;
&lt;/div&gt;</code></pre>

            <label>Value: <input v-model="fontSize" class="demo-input"></label>
            <div style="font-size: 21px">
              <date-picker v-model="fontSize" />
            </div>
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
      range: now.format('YYYY-MM-DD'),
      height: now.format('YYYY-MM-DD'),
      align: now.format('YYYY-MM-DD'),
      fontSize: now.format('YYYY-MM-DD'),
    }
  },
}
</script>
