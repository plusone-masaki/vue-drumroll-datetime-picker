<template>
  <!-- Dialog pickers -->
  <div id="dialog" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Dialog pickers</div>

        <code class="code">
              <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  dialog
/&gt;</pre>
        </code>

        <div class="has-text-centered">
          <date-time-picker v-model="now" dialog />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Hide overlay</div>

        <code class="code">
              <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  dialog
  hide-overlay
/&gt;</pre>
        </code>

        <div class="has-text-centered">
          <date-time-picker
            v-model="now"
            dialog
            hide-overlay
          />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Scoped slot</div>

        <code class="code">
              <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  dialog
&gt;
  &lt;template v-slot:activator="{ on }"&gt;
    &lt;button
      class="button is-primary"
      v-on="on"
    &gt;
      {{ '\{\{ now \}\}' }}
    &lt;/button&gt;
  &lt;/template&gt;
&lt;/date-time-picker&gt;</pre>
        </code>

        <div class="has-text-centered">
          <date-time-picker
            v-model="now"
            dialog
          >
            <template v-slot:activator="{ on }">
              <button
                class="button is-primary"
                v-on="on"
              >
                {{ now }}
              </button>
            </template>
          </date-time-picker>
        </div>
      </div>
    </div>
  </div><!-- /Dialog pickers -->
</template>

<script>
export default {
  name: 'DialogPickers',
  data () {
    return {
      now: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
}
</script>
