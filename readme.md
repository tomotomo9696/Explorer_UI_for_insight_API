# Explorer UI for insight API

__This is under development.__

BitZeny 向けに作ったブロックエクスプローラーのフロントエンドです。  
バックエンドに [insight API](https://github.com/bitpay/insight-api) を使用します。

## Description

***install***  
```
git clone https://github.com/tomotomo9696/Explorer_UI_for_insight_API
npm install
```

***build***  
```
npm run build
```

`/dist/`
以下にファイルが生成されます。  
実際に稼働させるときは、`bundle.js`と`style.css`以外を`index.html`にリダイレクトするよう設定してください。

## Config
`/src/config.js`を書き換えることで他のコインにも使用できますが、動作確認をしていないので自己責任でお願いします。

## Development
`npm run dev`

Vue を初めて使ったので、おかしいところ多いかと思います。  
お気軽にPRしてください。

## Author
[@tomotomo__9696](https://twitter.com/tomotomo__9696)

## License
MIT

