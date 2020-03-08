# vue-drumroll-datetime-picker

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## インターフェース仕様

### props
|name|type|default|description|
|---|---|---|---|
|active-class|[String, Array, Object]|"vdd-active"|アクティブな値に付けられるクラス名|
|value|[String, Date]|new Date()|日時|
|minute-interval|[String, Number]|5|分単位の間隔|
