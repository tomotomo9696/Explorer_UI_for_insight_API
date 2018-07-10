<template>

<div>
<loading v-if="!loaded"></loading>

<div class="row" v-if="loaded">
  <div class="mb-4 col-12">
    <div><span class="title">{{ $t("word.block") }}</span><span class="ml-2">{{ block.height }}</span></div>
    <div class="text-muted text-truncate">{{block.hash}}</div>
  </div>
  
  <div class="col-12">
   
    <table class="table summary-table">
      <tbody>
        <tr>
          <th scope="row">{{ $t("block.minedTime") }}</th>
          <td>{{ block.time | formatTimestamp }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("block.blockReward") }}</th>
          <td>{{ valueConvertion(block.reward) }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("word.size") }}</th>
          <td>{{ block.size }} bytes</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("word.transactionCount") }}</th>
          <td>{{ txlength }}</td>
        </tr>
        <tr v-if="block.poolInfo && block.poolInfo.poolName">
          <th scope="row">{{ $t("block.minedBy") }}</th>
          <td><a :href="block.poolInfo.url">{{ block.poolInfo.poolName }}</a></td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-6 text-left">
        <router-link v-if="block.previousblockhash" :to="`/block/${block.previousblockhash}`" tag="button" type="button" class="btn btn-outline-primary">
          < {{ block.height - 1}}
        </router-link>
      </div>
      
      <div class="col-6 text-right">
        <router-link v-if="block.nextblockhash" :to="`/block/${block.nextblockhash}`" tag="button" type="button" class="btn btn-outline-primary">
          {{ block.height + 1}} >
        </router-link>
      </div>
    </div>
  </div>
  <div v-scrolled="loadTx.bind(this, block.hash)" class="col-12">
    <transaction v-for="tx in txs" :tx="tx" :key="tx.txid" :is-list="true"></transaction>
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
import Tx from '../component/transaction.vue';

import Socket from "../socket";
import request from "../request";
import util from "../util";

import moment from "moment";


export default {
  data(){
    return {
      block      : {},
      txlength   : 0,
      txs        : [],
      loaded     : false,
      loadedTxs  : false,
      txLoading  : false,
      pageNum    : 0
    }
  },
  created(){
    Socket.$on("block", this.handleMessage);
    
    this.fetchData();
  },
  beforeDestroy(){
    Socket.$off("block", this.handleMessage);
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData(){
      this.reset();
      this.$root.setTitle("Block", this.$route.params.blockid);
        
      if(!util.isHash(this.$route.params.blockid)){
        this.$router.replace(`/404`);
        return;
      }
      
      let res = await request(`/block/${this.$route.params.blockid}`).catch(v => false);
      
      if(!res){
        this.$router.replace(`/404`);
        return;
      }

      this.block = res;
      this.txlength = this.block.tx.length;

      this.txs = [];
      this.loaded = true;
      this.loadTx(this.block.hash);
    },
    async loadTx(hash){
      if(this.loadedTxs || this.txLoading)
        return;
        
      this.txLoading = true;
 
      let res = await request(`/txs/?block=${this.block.hash}&pageNum=${this.pageNum}`).catch(v => false);
      
      if(res && hash === this.block.hash){
        this.txs.push(...res.txs);

        if(res.pagesTotal > this.pageNum + 1){
          this.pageNum++;
        }else{
          this.loadedTxs = true;
        }
      }

      this.txLoading = false;
    },
    handleMessage(msg){

    },
    valueConvertion(value){
      return util.valueConvertion(value);
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  },
  filters: {
    formatTimestamp(ts) {
      return moment(ts, "X").format("LLL");
    }
  },
  components: {
    "transaction": Tx,
    "loading": Loading
  }
}
</script>
