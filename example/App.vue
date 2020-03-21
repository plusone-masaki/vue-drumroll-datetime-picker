<template>
  <main>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Vue Drumroll DateTime Picker</h1>
          <h2 class="subtitle">Demo Page</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <!-- Basic usage -->
      <div id="basic" class="column is-10 is-offset-1">
        <div class="card">
          <div class="card-content">
            <div class="title">Basic usage</div>

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
      </div><!-- /Basic usage -->

      <!-- Dialog picker -->
      <div id="dialog" class="column is-10 is-offset-1">
        <div class="card">
          <div class="card-content">
            <div class="title">Dialog picker</div>

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
                  <button class="button is-primary" v-on="on">{{ now }}</button>
                </template>
              </date-time-picker>
            </div>
          </div>
        </div>
      </div><!-- /Dialog picker -->

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

                Value: <input v-model="now" class="demo-input">
                <date-time-picker
                  v-model="now"
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

                Value: <input v-model="now" class="demo-input">
                <date-time-picker
                  v-model="now"
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

                Value: <input v-model="now" class="demo-input">
                <date-time-picker
                  v-model="now"
                  type="time"
                  minute-interval="30"
                />
              </div>
            </div>
          </div>
        </div>
      </div><!-- /Other options -->
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs'
import DateTimePicker from '../src/pickers/DateTimePicker'
import '../src/sass/vue-deumroll-datetime-picker.sass'

export default {
  name: 'App',
  components: { DateTimePicker },
  data: () => ({
    now: dayjs().format('YYYY-MM-DD HH:mm'),
  }),
}
</script>

<style lang="sass" scoped>
.code
  background-color: #282c34
  border-radius: 4px
  color: #fff
  display: block
  padding: .5em 1em
  margin-bottom: 1rem

  .pre-code
    background: inherit
    color: inherit
    font-size: inherit
    padding: 0

.demo-input
  border: 1px solid #ccc
  border-radius: 4px
  font-size: 16px
  padding: .25em .5em
</style>
