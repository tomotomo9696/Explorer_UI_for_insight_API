<template>

<div>

<div class="row">
  <div class="mb-4 col-12">
    <div><span class="title">{{ $t("broadcast.broadcastTx") }}</span></div>
  </div>

  <div class="col-12">
    <div class="form-group">
      <label for="rawtx">{{ $t("broadcast.rawTransaction") }}</label>
      <textarea class="form-control mb-2" id="rawtx" rows="10" v-model="rawtx"></textarea>
      <div class="text-right">
        <button type="button" class="btn btn-primary" @click="broadcast">{{ $t("broadcast.send") }}</button>
      </div>
    </div>
    <div>
      <div class="alert alert-success" role="alert" v-if="txid">
        <div class="font-weight-bold">{{ $t("broadcast.success") }}</div>
        <div>{{ $t("word.transactionID") }} {{txid}}</div>
      </div>
      
      <div class="alert alert-danger" role="alert" v-if="error">
        <div class="font-weight-bold">{{ $t("broadcast.error") }}</div>
        <div v-if="error === 'invalidRawTx'">{{ $t("broadcast.invalidRawTx") }}</div>
        <div v-else>error</div>
      </div>
    </div>
  </div>
</div>

</div>

</template>

<script>
import bitcoin from "bitcoinjs-lib";

import CONFIG from "../config";


export default {
  data(){
    return {
      rawtx : "",
      error : "",
      txid : "",
      ready : true
    }
  },
  created(){
    this.$root.setTitle("broadcast.title");
  },
  methods: {
    async broadcast(){
      if(!this.ready)
        return;

      if(!this.rawtx)
        return;
        
      this.error = this.txid = "";
      this.ready = false;

      try{
        const tx = bitcoin.Transaction.fromHex(this.rawtx);
      }catch(e){
        this.error = "invalidRawTx";
        this.ready = true;
        return;
      }

      const body = JSON.stringify({rawtx : this.rawtx});
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      const res = await fetch(`${CONFIG.endpoint}/tx/send`, {method : "POST", headers, body})
                  .then(async res => {
                    if(!res.ok)
                      throw Error(await res.text());
                    return res.json();
                  })
                  .then(data => ({data}))
                  .catch(error => ({error}));

      if(res.data && res.data.txid){
        this.txid = res.data.txid,this.error = "";
      }else{
        this.txid = "";
        this.error = res.error instanceof Error ? res.error.message : res.error;
      }
      this.ready = true;
    }
  }
}
</script>
