# vue-drumroll-datetime-picker

[日本語](README.ja.md)

## Demo page

[here](https://www.plus-one.tech/products/demo/vue-drumroll-datetime-picker/)

## Getting started

### Install

```bash
yarn add vue-drumroll-datetime-picker

or

npm install vue-drumroll-datetime-picker
```

### Usage

```javascript
import Vue from 'vue'
import DateTimePicker, { DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'

Vue.component('DateTimePicker', DateTimePicker)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
```

## API references

### Props

#### DateTimePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|Open picker in dialog|
|dragSensitivity|[String, Number]|1.7|Drag sensitivity|
|format|String|"YYYY-MM-DD HH:mm"|Date format|
|hideOverlay|Boolean|false|Hide the dialog display overlay. Valid only if `dialog` is `true`|
|height|[String, Number]|"10em"|Specifies the height of the picker|
|hideButton|Boolean|false|Hide the dialog close button. Valid only if `dialog` is `true`|
|maxDate|[String, Number, Date]|`value + 100 years`|Maximum valid date and time|
|minDate|[String, Number, Date]|1900-01-01 00:00|Valid minimum date and time|
|minuteInterval|[String, Number]|1|Selectable minute intervals|
|scrollSensitivity|[String, Number]|0.8|Scroll sensitivity|
|touchSensitivity|[String, Number]|1.7|Touch operation sensitivity|
|type|["datetime", "date", "time"]|"datetime"|Picker type. Select from 3 types: datetime / date / time|
|value|[String, Number, Date]|undefined|Value of datetime|

#### DatePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|Open picker in dialog|
|dragSensitivity|[String, Number]|1.7|Drag sensitivity|
|format|String|"YYYY-MM-DD HH:mm"|Date format|
|height|[String, Number]|"10em"|Specifies the height of the picker|
|hideOverlay|Boolean|false|Hide the dialog display overlay. Valid only if `dialog` is `true`|
|hideButton|Boolean|false|Hide the dialog close button. Valid only if `dialog` is `true`|
|maxDate|[String, Number, Date]|`value + 100 years`|Maximum valid date and time|
|minDate|[String, Number, Date]|1900-01-01 00:00|Valid minimum date and time|
|separator|String|"-"|Change date separator character|
|scrollSensitivity|[String, Number]|0.8|Scroll sensitivity|
|touchSensitivity|[String, Number]|1.7|Touch operation sensitivity|
|value|[String, Number, Date]|undefined|Value of date|

#### TimePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|Open picker in dialog|
|dragSensitivity|[String, Number]|1.7|Drag sensitivity|
|format|String|"HH:mm"|Time format|
|height|[String, Number]|"10em"|Specifies the height of the picker|
|hideOverlay|Boolean|false|Hide the dialog display overlay. Valid only if `dialog` is `true`|
|hideButton|Boolean|false|Hide the dialog close button. Valid only if `dialog` is `true`|
|minuteInterval|[String, Number]|1|Selectable minute intervals|
|separator|String|":"|Change time separator character|
|scrollSensitivity|[String, Number]|0.8|Scroll sensitivity|
|touchSensitivity|[String, Number]|1.7|Touch operation sensitivity|
|value|[String, Number, Date]|undefined|Value of time|
