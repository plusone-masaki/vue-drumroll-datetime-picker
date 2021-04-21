# vue-drumroll-datetime-picker

[English](README.md)

## デモページ

[デモページ](https://www.plus-one.tech/products/demo/vue-drumroll-datetime-picker/)

## 利用方法

### インストール

```bash
yarn add vue-drumroll-datetime-picker

or

npm install vue-drumroll-datetime-picker
```

### 使い方

```javascript
import Vue from 'vue'
import DateTimePicker, { DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/vue-drumroll-datetime-picker.css'

Vue.component('DateTimePicker', DateTimePicker)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
```

## APIリファレンス

### Props

#### DateTimePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|ピッカーをダイアログで開く|
|dragSensitivity|[String, Number]|1.7|ドラッグ感度|
|format|String|"YYYY-MM-DD HH:mm"|日付形式|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が有効な場合のみ有効|
|maxDate|[String, Number, Date]|`value + 100 years`|有効な最大日時|
|minDate|[String, Number, Date]|1900-01-01 00:00|有効な最低日時|
|minuteInterval|[String, Number]|1|分単位の間隔|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|type|["datetime", "date", "time"]|"datetime"|ピッカーの種類。日時・年月日・時刻の3種類から選択|
|value|[String, Number, Date]|`required`|変更対象の値|

#### DatePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|ピッカーをダイアログで開く|
|dragSensitivity|[String, Number]|1.7|ドラッグ感度|
|format|String|"YYYY-MM-DD HH:mm"|日付形式|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が有効な場合のみ有効|
|maxDate|[String, Number, Date]|`value + 100 years`|有効な最大日時|
|minDate|[String, Number, Date]|1900-01-01 00:00|有効な最低日時|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|value|[String, Number, Date]|`required`|変更対象の値|

#### TimePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|ピッカーをダイアログで開く|
|dragSensitivity|[String, Number]|1.7|ドラッグ感度|
|format|String|"YYYY-MM-DD HH:mm"|日付形式|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が有効な場合のみ有効|
|minuteInterval|[String, Number]|1|分単位の間隔|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|value|[String, Number, Date]|`required`|変更対象の値|
