<template>
<div>
<loading v-if="!loaded"></loading>

<div class="row" v-if="loaded">
  <div class="mb-4 col-12">
    <div><span class="title">{{ $t("word.address") }}</span></div>
    <div class="text-muted text-truncate">{{address.addrStr}}</div>
  </div>
  
  <div class="col-12">
    <table class="table summary-table">
      <tbody>
        <tr>
          <th scope="row">{{ $t("address.totalReceived") }}</th>
          <td>{{ valueConvertion(address.totalReceived) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("address.totalSent") }}</th>
          <td>{{ valueConvertion(address.totalSent) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("address.finalBalance") }}</th>
          <td>{{ valueConvertion(address.balance) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("word.transactionCount") }}</th>
          <td>{{address.txApperances}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-scrolled="loadTx.bind(this, address.addrStr)" class="col-12">
    <transaction v-for="tx in txs" :tx="tx" :key="tx.txid" :is-list="true" :currentAddr="address.addrStr"></transaction>
  </div>
  
  <div :class="{invisible: !txLoading}" class="col-12">
    <div class="progress my-3">
      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading transactions...</div>
    </div>
  </div>
</div>

</div>

</template>

<script>
import CONFIG from "../config";

import Loading from "../component/loading.vue";
import Tx from "../component/transaction.vue";

import request from "../request";
import util from "../util";

export default {
  data(){
    return {
      address : {},
      txs : [],
      loaded : false,
      loadedTxs  : false,
      txLoading  : false,
      pageNum    : 0
    }
  },
  created(){
    this.fetchData();
  },
  watch: {
    "$route": "fetchData"
  },
  methods: {
    async fetchData(){
      this.reset();
      this.$root.setTitle(this.$t("word.address"), this.$route.params.address);
      
      let addrType = util.addressType(this.$route.params.address);

      if(!addrType || addrType === "BECH32"){
        this.$router.replace({ path : "/404" });
        return;
      }

      let res = await request(`/addr/${this.$route.params.address}?noTxList=1`).catch(v => false);
      
      if(!res){
        this.$router.replace(`/404`);
        return;
      }
      
      this.address = res;
      this.loaded = true;
      
      this.loadTx(this.address.addrStr);
    },
    async loadTx(addr){
      if(this.loadedTxs || this.txLoading)
        return;
        
      this.txLoading = true;
 
      let res = await request(`/txs/?address=${this.address.addrStr}&pageNum=${this.pageNum}`).catch(v => false);
      
      if(res && this.address.addrStr === addr){
        this.txs.push(...res.txs);

        if(res.pagesTotal > this.pageNum + 1){
          this.pageNum++;
        }else{
          this.loadedTxs = true;
        }
      }
 
      this.txLoading = false;
    },
    valueConvertion(value){
      return util.valueConvertion(value);
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  },
  components: {
    "transaction": Tx,
    "loading": Loading
  }
}
</script>
