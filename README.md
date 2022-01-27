# Simple design and lightweight wheel style datetime picker

`vue-drumroll-datetime-picker` is a wheel style datetime picker.
There is also a date-only and time-only picker.

There is a stationary format and a dialog format that can be installed directly on the screen, and it also supports responsiveness.
It is an easy-to-use and highly flexible library with a wide variety of customization such as date order and label editing.
Furthermore, the minified version is as light as 19kb.

[日本語](README.ja.md)

## Demo page

[here](https://www.plus-one.tech/vue-drumroll-datetime-picker/)

## Getting started

### Install

```bash
yarn add vue-drumroll-datetime-picker

or

npm install vue-drumroll-datetime-picker
```

### Global usage

```javascript
import Vue from 'vue'
import DateTimePicker, { DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'

Vue.component('DateTimePicker', DateTimePicker)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
```

### Local usage

```vue
<script>
import DateTimePicker, { DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'

export default {
  components: {
    DateTimePicker,
    DatePicker,
    TimePicker,
  },
  // ...your code
}
</script>
```

## API references

### Props

#### DateTimePicker

| name              | type                         | default                   | description                                                       |
|-------------------|------------------------------|---------------------------|-------------------------------------------------------------------|
| align             | String                       | "center"                  | Modify label alignment of the pickers                             |
| dateOrder         | Array                        | ['year', 'month', 'date'] | Order of the date picker                                          |
| dialog            | Boolean                      | false                     | Open picker in dialog                                             |
| dragSensitivity   | [String, Number]             | 1.7                       | Drag sensitivity                                                  |
| format            | String                       | "YYYY-MM-DD HH:mm"        | Date format                                                       |
| height            | [String, Number]             | "10em"                    | Specifies the height of the picker                                |
| hideOverlay       | Boolean                      | false                     | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton        | Boolean                      | false                     | Hide the dialog close button. Valid only if `dialog` is `true`    |
| maxDate           | [String, Number, Date]       | `value + 100 years`       | Maximum valid date and time                                       |
| minDate           | [String, Number, Date]       | 1900-01-01 00:00          | Valid minimum date and time                                       |
| minuteInterval    | [String, Number]             | 1                         | Selectable minute intervals for Time picker                       |
| pattern           | Object                       | `undefined`               | Customize picker labels<br>More details below                     |
| scrollSensitivity | [String, Number]             | 0.8                       | Scroll sensitivity                                                |
| touchSensitivity  | [String, Number]             | 1.7                       | Touch operation sensitivity                                       |
| type              | ["datetime", "date", "time"] | "datetime"                | Picker type. Select from 3 types: `datetime` / `date` / `time`    |
| value             | [String, Number, Date]       | `undefined`               | Value of datetime                                                 |

#### DatePicker

| name                   | type                   | default                    | description                                                       |
|------------------------|------------------------|----------------------------|-------------------------------------------------------------------|
| align                  | String                 | "center"                   | Modify text alignment of the pickers                              |
| dateOrder              | Array                  | ['year', 'month', 'date']  | Order of the date drums                                           |
| dialog                 | Boolean                | false                      | Open picker in dialog                                             |
| dragSensitivity        | [String, Number]       | 1.7                        | Drag sensitivity                                                  |
| format                 | String                 | "YYYY-MM-DD HH:mm"         | Date format                                                       |
| height                 | [String, Number]       | "10em"                     | Specifies the height of the picker                                |
| hideOverlay            | Boolean                | false                      | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton             | Boolean                | false                      | Hide the dialog close button. Valid only if `dialog` is `true`    |
| maxDate                | [String, Number, Date] | `value + 100 years`        | Maximum valid date and time                                       |
| minDate                | [String, Number, Date] | 1900-01-01 00:00           | Valid minimum date and time                                       |
| pattern                | Object                 | `undefined`                | Customize picker labels<br>More details below                     |
| `deprecated` separator | String                 | "-"                        | Change date separator character                                   |
| scrollSensitivity      | [String, Number]       | 0.8                        | Scroll sensitivity                                                |
| touchSensitivity       | [String, Number]       | 1.7                        | Touch operation sensitivity                                       |
| value                  | [String, Number, Date] | `undefined`                | Value of date                                                     |

#### TimePicker

| name                   | type                   | default  | description                                                       |
|------------------------|------------------------|----------|-------------------------------------------------------------------|
| align                  | String                 | "center" | Modify text alignment of the pickers                              |
| dialog                 | Boolean                | false    | Open picker in dialog                                             |
| dragSensitivity        | [String, Number]       | 1.7      | Drag sensitivity                                                  |
| format                 | String                 | "HH:mm"  | Time format                                                       |
| height                 | [String, Number]       | "10em"   | Specifies the height of the picker                                |
| hideOverlay            | Boolean                | false    | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton             | Boolean                | false    | Hide the dialog close button. Valid only if `dialog` is `true`    |
| minuteInterval         | [String, Number]       | 1        | Selectable minute intervals                                       |
| pattern                | Object                 | `undefined` | Customize picker labels<br>More details below                     |
| `deprecated` separator | String                 | ":"      | Change time separator character                                   |
| scrollSensitivity      | [String, Number]       | 0.8      | Scroll sensitivity                                                |
| touchSensitivity       | [String, Number]       | 1.7      | Touch operation sensitivity                                       |
| value                  | [String, Number, Date] | `undefined` | Value of time                                                     |


### Props: "pattern" detail

"pattern" props are used to customize the labels displayed in the picker.
This allows you to add additional information to the picker such as day of the week and AM / PM.

#### Complete example

```
{
  year: "YYYY",
  month: "MMM", // -> Jan
  date: "DD(ddd)", // -> 08(Tue)
  hour: "A hh", // -> PM 9
  minute: "mm",
  dividerDate: '/', // -> 2022/Jan/08(Tue)
  dividerTime: '@', // -> PM 9@15
}
```
