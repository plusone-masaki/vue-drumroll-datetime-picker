<template>
  <!-- Other options -->
  <div id="options" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Other options</div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Min year / Max year</div>

            <code class="code">
                  <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  min-year="2010"
  max-year="2038"
/&gt;</pre>
            </code>

            Value: <input v-model="range" class="demo-input">
            <date-time-picker
              v-model="range"
              min-year="2010"
              max-year="2038"
            />
          </div>
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Format</div>

            <code class="code">
                  <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  type="date"
  format="YYYY-MM-DD"
/&gt;</pre>
            </code>

            Value: <input v-model="format" class="demo-input">
            <date-time-picker
              v-model="format"
              type="date"
              format="YYYY-MM-DD"
            />
          </div>
        </div>

        <div class="column is-6">

          <div class="card-content">
            <div class="subtitle">Minute intervals</div>

            <code class="code">
                  <pre class="pre-code">
&lt;date-time-picker
  v-model="now"
  type="time"
  minute-interval="30"
/&gt;</pre>
            </code>

            Value: <input v-model="intervals" class="demo-input">
            <date-time-picker
              v-model="intervals"
              type="time"
              minute-interval="30"
            />
          </div>
        </div>
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
      range: now.format('YYYY-MM-DD HH:mm'),
      format: now.format('YYYY-MM-DD'),
      intervals: now.format('YYYY-MM-DD HH:mm'),
    }
  },
}
</script>
