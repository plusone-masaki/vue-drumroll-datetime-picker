<template>
  <!-- Basic usages -->
  <div id="time-picker-basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Basic usages</div>

        <pre class="pre-code"><code class="code">&lt;time-picker v-model="now" /&gt;</code></pre>

        <label>Value: <input v-model="time" class="demo-input"></label>
        <time-picker v-model="time" />
      </div>
    </div>
  </div><!-- /Basic usages -->
</template>

<script>
export default {
  name: 'BasicUsages',
  data () {
    return {
      time: this.$dayjs().format('HH:mm'),
    }
  },
}
</script>
