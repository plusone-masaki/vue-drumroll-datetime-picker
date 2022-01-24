<template>
  <!-- Basic usages -->
  <div id="date-picker-basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Basic usages</div>

        <pre class="pre-code"><code class="code">&lt;date-picker v-model="now" /&gt;</code></pre>

        <label>Value: <input v-model="date" class="demo-input"></label>
        <date-picker v-model="date" />
      </div>
    </div>
  </div><!-- /Basic usages -->
</template>

<script>
export default {
  name: 'BasicUsages',
  data () {
    return {
      date: this.$dayjs().format('YYYY-MM-DD'),
    }
  },
}
</script>
