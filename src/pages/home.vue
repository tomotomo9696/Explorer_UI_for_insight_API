<template>

<div class="row">
  <div class="mb-4 col-12">
    <div class="title">{{ $t("home.latestBlocks") }}</div>
  </div>
  
  <div class="mb-4 col-12 table-responsive">
    <table class="table block-list-table">
      <thead>
        <tr><th>{{ $t("word.blockHeight") }}</th><th>{{ $t("word.age") }}</th><th>{{ $t("word.transactionCount") }}</th><th class="d-none d-lg-table-cell">{{ $t("block.minedBy") }}</th><th>{{ $t("word.size") }}</th></tr>
      </thead>
      <tbody>
        <tr v-if="!blocks.length">
          <td colspan="5">{{ $t("home.waitingBlock") }}</td>
        </tr>
        <tr v-for="(block, i) in blocks">
          <td><router-link :to="`/block/${block.hash}`">{{block.height}}</router-link></td>
          <td>{{ age[i] }}</td>
          <td>{{ block.txlength }}</td>
          <td class="d-none d-lg-table-cell"><a v-if="block.poolInfo" :href="block.poolInfo.url">{{ block.poolInfo.poolName }}</a></td>
          <td>{{ block.size }} byte</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="mb-4 col-12">
    <div class="title">{{ $t("home.latestTxs") }}</div>
  </div>
  
  <div class="col-12">
    <table class="table realtime-tx-table">
      <thead>
        <tr><th class="w-75">{{ $t("word.transactionHash") }}</th><th class="w-25">{{ $t("tx.value") }}</th></tr>
      </thead>
      <tbody>
        <tr v-if="!txs.length">
          <td colspan="2">{{ $t("home.waitingTx") }}</td>
        </tr>
        <tr v-for="tx in txs">
          <td><router-link :to="`/tx/${tx.txid}`">{{tx.txid}}</router-link></td>
          <td>{{ valueConvertion(tx.valueOut) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>

<script>
import CONFIG from "../config";

import Tx from '../component/transaction.vue';

import Socket from "../socket";
import request from "../request";
import util from "../util";

import moment from "moment";

export default {
  data(){
    return {
      blocks : [],
      txs : [],
      age : [],
      intervalID : -1
    }
  },
  methods:{
    onTx(tx){
      this.txs.unshift(tx);
      this.txs = this.txs.slice(0, 5);
      
    },
    async onBlock(block){
      let res = await request(`/block/${block}`).catch(v => false);
      if(!res)
        return;
      res.txlength = res.tx.length;
      this.blocks.unshift(res);
      this.blocks = this.blocks.slice(0, 5);
      this.computeAge();
    },
    valueConvertion(value){
      return util.valueConvertion(value);
    },
    computeAge(){
      this.age = this.blocks.map(d => moment(d.time, "X").fromNow());
    }
  },
  async created(){
    Socket.$on("block", this.onBlock);
    Socket.$on("tx", this.onTx);
    this.$root.$on("changedLocale", this.computeAge);

    this.$root.setTitle("home.title");
    
    let res = await request(`/blocks?limit=5`).catch(v => false);
    if(!res)
      return;

    this.blocks = res.blocks.slice(0, 5);
    this.computeAge();
    
    this.intervalID = setInterval(this.computeAge, 10000);
  },
  beforeDestroy(){
    Socket.$off("block", this.onBlock);
    Socket.$off("tx", this.onTx);
    clearInterval(this.intervalID);
  },
  components: {
    "transaction": Tx
  }
}
</script>
