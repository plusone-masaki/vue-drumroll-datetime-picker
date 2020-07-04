# vue-drumroll-datetime-picker

## Getting started

### Install

```bash
yarn add vue-drumroll-datetime-picker
```

### Usage

```javascript
import Vue from 'vue'
import DateTimePicker from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'

Vue.component('DateTimePicker', DateTimePicker)
```

## API references

### Props
|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|ピッカーをダイアログで開く|
|dragSensitivity|[String, Number]|1.7|ドラッグ感度|
|format|String|"YYYY-MM-DD HH:mm"|日付形式|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が有効な場合のみ有効|
|maxDate|[String, Number, Date]|`undefined`|有効な最大日時|
|minDate|[String, Number, Date]|`now - 100 years`|有効な最低日時|
|minuteInterval|[String, Number]|1|分単位の間隔|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|type|["datetime", "date", "time"]|"datetime"|ピッカーの種類。日時・年月日・時刻の3種類から選択|
|value|[String, Number, Date]|`required`|変更対象の値|
