<template>
  <!-- Getting started -->
  <div id="date-picker-basic" class="column is-10 is-offset-1">
    <div class="card">
      <div class="card-content">
        <div class="title">Getting Started</div>
      </div>

      <!-- /Installation -->
      <div class="card-content">
        <div class="subtitle">Installation</div>

        <pre class="pre-code"><code class="code"><p class="bash">yarn add vue-drumroll-datetime-picker</p>
or

<p class="bash">npm install vue-drumroll-datetime-picker</p></code></pre>
      </div><!-- /Installation -->

      <!-- Global usage -->
      <div class="card-content">
        <div class="subtitle">Global usage</div>

        <pre class="pre-code"><code class="code">import Vue from 'vue'
import DateTimePicker from 'vue-drumroll-datetime-picker'
// or import { DateTimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'

Vue.component('DateTimePicker', DateTimePicker)</code></pre>
      </div><!-- /Global usage -->

      <!-- Local usage -->
      <div class="card-content">
        <div class="subtitle">Local usage</div>

        <pre class="pre-code"><code class="code">&lt;script&gt;
import { DateTimePicker } from 'vue-drumroll-datetime-picker'
// or import { DateTimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'

export default {
  components: {
    DateTimePicker,
  },
  // ...your code
}
&lt;script&gt;</code></pre>
      </div><!-- /Local usage -->
    </div>
  </div><!-- /Getting started -->
</template>

<script>
export default {
  name: 'GettingStarted',
}
</script>

<style lang="sass" scoped>
.bash
  margin-left: 1em
  position: relative

  &::before
    content: "$"
    margin-left: -1em
    position: absolute
    user-select: none
</style>
