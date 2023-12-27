# Simple design and lightweight wheel style datetime picker

`vue-drumroll-datetime-picker` is a wheel style datetime picker.
There is also a date-only and time-only picker.

There is a fixed format and a dialog format that can be installed directly on the screen, and it also supports responsive support.
It is an easy-to-use and highly flexible library with plenty of customization such as date order and label editing.
Furthermore, the file size is as light as 50kb or less.

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
import { createApp } from 'vue'
import DateTimePicker from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'

const app = createApp()
app.use(DateTimePicker)
```

### Local usage

```vue
<script>
import { DateTimePicker, DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/style.css'

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

or

```vue
<script setup>
import { DateTimePicker, DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/style.css'
</script>
```

## API references

### Props

#### DateTimePicker

| name              | type                         | default                   | description                                                       |
|-------------------|------------------------------|---------------------------|-------------------------------------------------------------------|
| dateOrder         | Array                        | ['year', 'month', 'date'] | Order of the date picker                                          |
| dialog            | Boolean                      | false                     | Open picker in dialog                                             |
| dragSensitivity   | [String, Number]             | 1.7                       | Drag sensitivity                                                  |
| format            | String                       | "YYYY-MM-DD HH:mm"        | Date format                                                       |
| height            | [String, Number]             | "10em"                    | Specifies the height of the picker                                |
| hideOverlay       | Boolean                      | false                     | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton        | Boolean                      | false                     | Hide the dialog close button. Valid only if `dialog` is `true`    |
| locale            | String                       | `undefined`               | Locale of picker                                                  |
| maxDate           | [String, Number, Date]       | `value + 100 years`       | Maximum valid date and time                                       |
| minDate           | [String, Number, Date]       | 1900-01-01 00:00          | Valid minimum date and time                                       |
| minuteInterval    | [String, Number]             | 1                         | Selectable minute intervals for Time picker                       |
| modelValue        | [String, Number, Date]       | `required`                | Value of datetime                                                 |
| pattern           | Object                       | `undefined`               | Customize picker labels<br>More details below                     |
| scrollSensitivity | [String, Number]             | 1.0                       | Scroll sensitivity                                                |
| touchSensitivity  | [String, Number]             | 1.7                       | Touch operation sensitivity                                       |
| type              | ["datetime", "date", "time"] | "datetime"                | Picker type. Select from 3 types: `datetime` / `date` / `time`    |

#### DatePicker

| name              | type                   | default                   | description                                                       |
|-------------------|------------------------|---------------------------|-------------------------------------------------------------------|
| dateOrder         | Array                  | ['year', 'month', 'date'] | Order of the date drums                                           |
| dialog            | Boolean                | false                     | Open picker in dialog                                             |
| dragSensitivity   | [String, Number]       | 1.7                       | Drag sensitivity                                                  |
| format            | String                 | "YYYY-MM-DD HH:mm"        | Date format                                                       |
| height            | [String, Number]       | "10em"                    | Specifies the height of the picker                                |
| hideOverlay       | Boolean                | false                     | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton        | Boolean                | false                     | Hide the dialog close button. Valid only if `dialog` is `true`    |
| locale            | String                 | `undefined`               | Locale of picker                                                  |
| maxDate           | [String, Number, Date] | `value + 100 years`       | Maximum valid date and time                                       |
| minDate           | [String, Number, Date] | 1900-01-01 00:00          | Valid minimum date and time                                       |
| modelValue        | [String, Number, Date] | `required`               | Value of date                                                     |
| pattern           | Object                 | `undefined`               | Customize picker labels<br>More details below                     |
| scrollSensitivity | [String, Number]       | 1.0                       | Scroll sensitivity                                                |
| touchSensitivity  | [String, Number]       | 1.7                       | Touch operation sensitivity                                       |

#### TimePicker

| name              | type                   | default     | description                                                       |
|-------------------|------------------------|-------------|-------------------------------------------------------------------|
| dialog            | Boolean                | false       | Open picker in dialog                                             |
| dragSensitivity   | [String, Number]       | 1.7         | Drag sensitivity                                                  |
| format            | String                 | "HH:mm"     | Time format                                                       |
| height            | [String, Number]       | "10em"      | Specifies the height of the picker                                |
| hideOverlay       | Boolean                | false       | Hide the dialog display overlay. Valid only if `dialog` is `true` |
| hideButton        | Boolean                | false       | Hide the dialog close button. Valid only if `dialog` is `true`    |
| locale            | String                 | `undefined` | Locale of picker                                                  |
| minuteInterval    | [String, Number]       | 1           | Selectable minute intervals                                       |
| modelValue        | [String, Number, Date] | `required`  | Value of time                                                     |
| pattern           | Object                 | `undefined` | Customize picker labels<br>More details below                     |
| scrollSensitivity | [String, Number]       | 1.0         | Scroll sensitivity                                                |
| touchSensitivity  | [String, Number]       | 1.7         | Touch operation sensitivity                                       |


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
  dividerDate: "/", // -> 2022/Jan/08(Tue)
  dividerTime: "@", // -> PM 9@15
}
```
