<template>
  <!-- Dialog pickers -->
  <div id="time-picker-dialog" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Dialog pickers</div>

        <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  dialog
/&gt;</code></pre>

        <div class="has-text-centered">
          <time-picker v-model="dialog" dialog />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Hide overlay</div>

        <pre class="pre-code"><code class="code">&lt;time-picker
  v-model="now"
  dialog
  hide-overlay
/&gt;</code></pre>

        <div class="has-text-centered">
          <time-picker
            v-model="hideOverlay"
            dialog
            hide-overlay
          />
        </div>
      </div>

      <div class="card-content">
        <div class="subtitle">Scoped slot</div>

        <pre class="pre-code"><code class="code">&lt;time-picker
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
&lt;/time-picker&gt;</code></pre>

        <div class="has-text-centered">
          <time-picker
            v-model="scoped"
            dialog
          >
            <template v-slot:activator="{ on }">
              <button
                class="button is-primary"
                v-on="on"
              >
                {{ scoped }}
              </button>
            </template>
          </time-picker>
        </div>
      </div>
    </div>
  </div><!-- /Dialog pickers -->
</template>

<script>
export default {
  name: 'DialogPickers',
  data () {
    const now = this.$dayjs()
    return {
      dialog: now.format('HH:mm'),
      hideOverlay: now.format('HH:mm'),
      scoped: now.format('HH:mm'),
    }
  },
}
</script>
