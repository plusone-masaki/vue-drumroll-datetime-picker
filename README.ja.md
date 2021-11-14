# vue-drumroll-datetime-picker

[English](README.md)

## デモページ

[デモページ](https://www.plus-one.tech/vue-drumroll-datetime-picker/)

## 利用方法

### インストール

```bash
yarn add @plusone-masaki/vue-drumroll-datetime-picker

or

npm install @plusone-masaki/vue-drumroll-datetime-picker
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
|height|[String, Number]|"10em"|ピッカーの高さ|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効|
|hideButton|Boolean|false|ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効|
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
|height|[String, Number]|"10em"|ピッカーの高さ|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効|
|hideButton|Boolean|false|ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効|
|maxDate|[String, Number, Date]|`value + 100 years`|有効な最大日時|
|minDate|[String, Number, Date]|1900-01-01 00:00|有効な最低日時|
|separator|String|"-"|日付の区切り文字|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|value|[String, Number, Date]|`required`|変更対象の値|

#### TimePicker

|name|type|default|description|
|---|---|---|---|
|dialog|Boolean|false|ピッカーをダイアログで開く|
|dragSensitivity|[String, Number]|1.7|ドラッグ感度|
|format|String|"YYYY-MM-DD HH:mm"|日付形式|
|height|[String, Number]|"10em"|ピッカーの高さ|
|hideOverlay|Boolean|false|ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効|
|hideButton|Boolean|false|ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効|
|minuteInterval|[String, Number]|1|分単位の間隔|
|separator|String|":"|時刻の区切り文字|
|scrollSensitivity|[String, Number]|0.8|スクロール感度|
|touchSensitivity|[String, Number]|1.7|タッチ操作の感度|
|value|[String, Number, Date]|`required`|変更対象の値|
