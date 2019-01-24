module.exports = {
  word : {
    block : "ブロック",
    blockHash : "ブロックハッシュ",
    blockHeight : "ブロック高",
    transaction : "トランザクション",
    transactionHash : "トランザクションハッシュ",
    transactionID : "トランザクションID",
    transactionCount : "トランザクション数",
    address : "アドレス",
    comfirmed : "確認済",
    status : "ステータス",
    size : "サイズ",
    age : "経過時間",
    loading : "読み込み中"
  },
  block : {
    minedBy : "採掘者",
    blockReward : "ブロック報酬",
    minedTime : "採掘日時",
    merkleRoot : "マークルルート",
    segwitCommitment : "Segwit コミットメント",
    version : "バージョン",
    difficulty : "難易度",
    bits : "Bits",
    nonce : "Nonce",
    advancedDetails : "詳細情報"
  },
  tx : {
    receivedTime : "受信日時",
    lockTime : "ロックタイム",
    value : "送金額",
    valueOut : "送金額",
    fee : "手数料",
    inputs : "入力なし | {count} 入力 | {count} 入力",
    outputs : "{count} 出力 | {count} 出力",
    confirmations : "未確認 | {confirmations} 確認 | {confirmations} 確認",
    coinbase : "コインベース（新規発行されたコイン）",
    segwitCommitment : "Segwit コミットメント",
    inputScript : "入力スクリプト | 入力スクリプト",
    outputScript : "出力スクリプト | 出力スクリプト",
    showScript: "スクリプトを表示",
    hideScript: "スクリプトを非表示"
  },
  header : {
    tools : "ツール",
    search : {
      placeholder : "アドレス、ハッシュ、ブロック高",
      notFound : "見つかりませんでした。"
    }
  },
  home : {
    title : "ホーム",
    latestBlocks : "直近のブロック",
    latestTxs : "直近のトランザクション",
    waitingBlock : "ブロック待機中",
    waitingTx : "トランザクション待機中"
  },
  address : {
    totalReceived : "合計入金額",
    totalSent : "合計送金額",
    finalBalance : "最終的な残高"
  },
  broadcast : {
    title : "取引の送信",
    broadcastTx : "トランザクションのブロードキャスト",
    rawTransaction : "16進数のトランザクション",
    send : "トランザクションを送信",
    success : "送信に成功しました",
    error : "送信に失敗しました",
    invalidRawTx : "フォーマットが正しくありません"
  },
  blocks : {
    title : "ブロックリスト",
    loadMore : "さらに読み込む",
    notFound : "見つかりませんでした"
  },
  error : {
    notFound : "ページが見つかりませんでした"
  },
  saveAddress : {
    openButton : "保存したアドレス",
    modalTitle : "保存したアドレス",
    description : "よく使うアドレスを保存して、すぐ確認することができます。",
    notFound : "アドレスが保存されていません。",
    placeholder : "保存するアドレス",
    save : "保存",
    delete : "選択したものを削除",
    confirm : "以下のアドレスをこの一覧から削除します。よろしいですか？"
  },
  scanqr : {
    title : "QRコードスキャン",
    description : "QRコードをスキャンして、そのアドレスのページに移動できます。",
    notAllowed : "カメラの使用が拒否されました。スキャン機能を利用したい場合は手動で許可してください。",
    deviceNotFound : "カメラデバイスが見つかりませんでした。",
    notSupported : "セキュリティ上の制約でカメラを使用することができません。",
    notReadable : "カメラが使用中のため使用できません。",
    error : "カメラが使用できません。ブラウザが対応していない可能性があります。",
    addressNotFound : "QRコードにアドレスが見つかりませんでした。"
  },
  status : {
    title : "ステータス",
    status : "ステータス",
    syncStatus : "同期ステータス",
    syncProgress : "同期の進捗",
    startTime : "同期開始時刻",
    endTime : "同期終了時刻",
    startBlock : "開始時のブロック高",
    lastBlock : "最新のブロック",
    lastBlockCoind : "最新のブロック (coind)",
    lastBlockInsight : "チェーンの先頭 (insight)",
    nodeStatus : "ノードステータス",
    version : "バージョン",
    protocolVersion : "プロトコルバージョン",
    blocks : "ブロック",
    timeOffset : "時間のずれ",
    connections : "他ノードへの接続数",
    difficulty : "採掘難易度",
    network : "ネットワーク",
    proxy : "プロキシ",
    infoErrors : "エラー情報"
  },
  copyButton : {
    copied : "コピーしました",
    copyFailed : "コピーできませんでした"
  }
}
