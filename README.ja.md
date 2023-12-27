# シンプルデザインで軽量なドラム式デートタイムピッカー

`vue-drumroll-datetime-picker` はスクロールで操作可能なドラム式デートタイムピッカーです。
日付のみ、時刻のみのピッカーもあります。

画面に直接設置できる据え置き形式とダイアログ形式があり、レスポンシブにも対応。
年月日の順序やラベルの編集などカスタマイズも豊富に取り揃え、使いやすく自由度の高いライブラリです。
さらにファイルサイズは50kb以下の超軽量。

動作の様子は [デモページ](https://www.plus-one.tech/vue-drumroll-datetime-picker/) からお試しいただけます。

[English](README.md)

## デモページ

[デモページ](https://www.plus-one.tech/vue-drumroll-datetime-picker/)

## 利用方法

### インストール

```bash
yarn add vue-drumroll-datetime-picker

or

npm install vue-drumroll-datetime-picker
```

### 使い方（アプリケーション全体で利用する場合）

```javascript
import { createApp } from 'vue'
import DateTimePicker from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/dist/style.css'

const app = createApp()
app.use(DateTimePicker)
```

### 使い方（個別のコンポーネントで利用する場合）

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

または

```vue
<script setup>
import { DateTimePicker, DatePicker, TimePicker } from 'vue-drumroll-datetime-picker'
import 'vue-drumroll-datetime-picker/style.css'
</script>
```

## APIリファレンス

### Props

#### DateTimePicker

| 項目名               | 型                            | デフォルト                     | 説明                                             |
|-------------------|------------------------------|---------------------------|------------------------------------------------|
| dateOrder         | Array                        | ['year', 'month', 'date'] | 年月日の順序                                         |
| dialog            | Boolean                      | false                     | ピッカーをダイアログで開く                                  |
| dragSensitivity   | [String, Number]             | 1.7                       | ドラッグ感度                                         |
| format            | String                       | "YYYY-MM-DD HH:mm"        | 日付形式                                           |
| height            | [String, Number]             | "10em"                    | ピッカーの高さ                                        |
| hideOverlay       | Boolean                      | false                     | ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効 |
| hideButton        | Boolean                      | false                     | ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効 |
| locale            | String                       | `undefined`               | 言語の指定 ※主に曜日の表記に使用                              |
| maxDate           | [String, Number, Date]       | `value + 100 years`       | 有効な最大日時                                        |
| minDate           | [String, Number, Date]       | 1900-01-01 00:00          | 有効な最低日時                                        |
| minuteInterval    | [String, Number]             | 1                         | 分単位の間隔                                         |
| modelValue        | [String, Number, Date]       | `required`                | 変更対象の値                                         |
| pattern           | Object                       | `undefined`               | ピッカーのラベルをカスタマイズできる。<br/>詳細は下に記載                |
| scrollSensitivity | [String, Number]             | 1.0                       | スクロール感度                                        |
| touchSensitivity  | [String, Number]             | 1.7                       | タッチ操作の感度                                       |
| type              | ["datetime", "date", "time"] | "datetime"                | ピッカーの種類。日時・年月日・時刻の3種類から選択                      |

#### DatePicker

| 項目名               | 型                      | デフォルト                     | 説明                |
|-------------------|------------------------|---------------------------|-------------------|
| dateOrder         | Array                  | ['year', 'month', 'date'] | 年月日の順序            |
| dialog            | Boolean                | false                     | ピッカーをダイアログで開く     |
| dragSensitivity   | [String, Number]       | 1.7                       | ドラッグ感度            |
| format            | String                 | "YYYY-MM-DD HH:mm"        | 日付形式              |
| height            | [String, Number]       | "10em"                    | ピッカーの高さ           |
| hideOverlay       | Boolean                | false                     | ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効 |
| hideButton        | Boolean                | false                     | ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効 |
| locale            | String                 | `undefined`               | 言語の指定 ※主に曜日の表記に使用 |
| maxDate           | [String, Number, Date] | `value + 100 years`       | 有効な最大日時           |
| minDate           | [String, Number, Date] | 1900-01-01 00:00          | 有効な最低日時           |
| modelValue        | [String, Number, Date] | `required`                | 変更対象の値            |
| pattern           | Object                 | `undefined`               | ピッカーのラベルをカスタマイズできる。<br/>詳細は下に記載 |
| scrollSensitivity | [String, Number]       | 1.0                       | スクロール感度           |
| touchSensitivity  | [String, Number]       | 1.7                       | タッチ操作の感度          |

#### TimePicker

| 項目名               | 型                      | デフォルト       | 説明                                              |
|-------------------|------------------------|-------------|-------------------------------------------------|
| dialog            | Boolean                | false       | ピッカーをダイアログで開く                                   |
| dragSensitivity   | [String, Number]       | 1.7         | ドラッグ感度                                          |
| format            | String                 | "HH:mm"     | 日付形式                                            |
| height            | [String, Number]       | "10em"      | ピッカーの高さ                                         |
| hideOverlay       | Boolean                | false       | ダイアログ表示のオーバーレイを非表示にする。`dialog` が `true` の場合のみ有効 |
| hideButton        | Boolean                | false       | ダイアログ表示の確定ボタンを非表示にする。`dialog` が `true` の場合のみ有効  |
| locale            | String                 | `undefined` | 言語の指定 ※主に曜日の表記に使用                               |
| minuteInterval    | [String, Number]       | 1           | 分単位の間隔                                          |
| modelValue        | [String, Number, Date] | `required`  | 変更対象の値                                          |
| pattern           | Object                 | `undefined` | ピッカーのラベルをカスタマイズできる。<br/>詳細は下に記載                 |
| scrollSensitivity | [String, Number]       | 1.0         | スクロール感度                                         |
| touchSensitivity  | [String, Number]       | 1.7         | タッチ操作の感度                                        |


### Props: "pattern" について

"pattern" props は、ピッカーに表示するラベルをカスタマイズするために利用します。
これによって和暦の年号や曜日、AM/PMといった補足情報をピッカーに表示できます。

#### 完全な例

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
