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

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Alignment</div>

            <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  align="left"
/&gt;</code></pre>

            <label>Value: <input v-model="align" class="demo-input"></label>
            <time-picker
              v-model="align"
              align="left"
            />
          </div>
        </div><!-- /column -->

        <div class="column is-6">
          <div class="card-content">
            <div class="subtitle">Font size</div>

            <pre class="pre-code"><code class="code">&lt;div style="font-size: 21px"&gt;
  &lt;time-picker v-model="now" /&gt;
&lt;/div&gt;</code></pre>

            <label>Value: <input v-model="fontSize" class="demo-input"></label>
            <div style="font-size: 21px">
              <time-picker v-model="fontSize" />
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
      range: now.format('HH:mm'),
      intervals: now.format('HH:mm'),
      fontSize: now.format('HH:mm'),
      align: now.format('HH:mm'),
      height: now.format('HH:mm'),
    }
  },
}
</script>
