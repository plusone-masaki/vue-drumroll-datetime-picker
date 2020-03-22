<template>
  <!-- Basic usages -->
  <div id="basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Basic usages</div>

        <code class="code">
          &lt;date-time-picker v-model="now" /&gt;
        </code>

        Value: <input v-model="now" class="demo-input">
        <date-time-picker v-model="now" />
      </div>

      <div class="columns is-gapless">

        <!-- Date picker -->
        <div class="column">
          <div class="card-content">
            <div class="subtitle">Date picker</div>

            <code class="code">
                  <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  type="date"
/&gt;</pre>
            </code>

            Value: <input v-model="now" class="demo-input">
            <date-time-picker v-model="now" type="date" />
          </div>
        </div>

        <!-- Time picker -->
        <div class="column">
          <div class="card-content">
            <div class="subtitle">Time picker</div>

            <code class="code">
                  <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  type="time"
/&gt;</pre>
            </code>

            Value: <input v-model="now" class="demo-input">
            <date-time-picker v-model="now" type="time" />
          </div>
        </div>

      </div>
    </div>
  </div><!-- /Basic usages -->
</template>

<script>
export default {
  name: 'BasicUsages',
  data () {
    return {
      now: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
}
</script>
