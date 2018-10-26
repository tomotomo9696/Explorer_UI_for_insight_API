<template>

<div>
<loading v-if="!loaded"></loading>

<div class="row" v-if="loaded">
  <div class="mb-4 col-12">
    <div class="title">{{ $t("word.transaction") }}</div>
    <div class="copy-button-container text-muted">
      <div class="copy-button-item-data text-truncate">
        {{tx.txid}}
      </div>
      <div class="copy-button-item-button">
        <i class="material-icons md-default align-top copy-button" v-clipboard:copy="tx.txid">content_copy</i>
      </div>
    </div>
  </div>
  
  <div class="col-12">
    <div class="row p-3">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="big-text" :class="confirmationsColor">{{ $tc("tx.confirmations", confirmations, {confirmations : confirmations} ) }}</div>
        
        <table class="tx-summary-table w-100">
          <tbody>
            <tr>
              <th scope="row">{{ $t("tx.receivedTime") }}</th>
              <td v-if="tx.time">{{ tx.time | formatTimestamp }}</td>
              <td v-else>-</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("block.minedTime") }}</th>
              <td v-if="tx.blocktime">{{ tx.blocktime | formatTimestamp }}</td>
              <td v-else>-</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("word.size") }}</th>
              <td>{{ tx.size }} bytes</td>
            </tr>
            <tr>
              <th scope="row">{{ $t("tx.lockTime") }}</th>
              <td>{{ tx.locktime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-6 text-lg-right clearfix">
        <div class="big-text">{{ $t("tx.valueOut") }} <span class="bold-number">{{ valueConvertion(tx.valueOut) }}</span></div>
        
        <table class="tx-summary-table w-100 float-lg-right" v-if="!tx.isCoinBase">
          <tbody>
            <tr>
              <th scope="row">{{ $t("tx.fee") }}</th>
              <td>{{ valueConvertion(tx.fees) }} </td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>{{ satoshiByte }} sat/byte</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center text-truncate">
      <span class="font-weight-bold">{{ $t("word.block") }}</span>&nbsp;&nbsp;<router-link :to="`/block/${tx.blockhash}`">{{ tx.blockhash }}</router-link>
    </div>
  </div>
  
  <div class="col-12">
    <transaction :tx="tx" :is-list="false"></transaction>
  </div>
  <div class="col-12 text-center mb-3">
    <button class="btn btn-primary" type="button" @click="showScript = !showScript">
      <span v-if="!showScript">{{ $t("tx.showScript") }}</span>
      <span v-if="showScript">{{ $t("tx.hideScript") }}</span>
    </button>
  </div>

  <transition name="fade">
  <div class="col-12" v-if="showScript" id="script">
    <div class="row">
      <div class="col-lg-6">
        <div class="text-center text-truncate lead">{{ $tc("tx.inputScript", inputScript.length) }}</div>
        <div class="scriptBox my-2" v-for="data in inputScript" v-if="data">
          <div v-for="(script, type) in data">
            <div class="my-1 font-weight-bold">{{type}}</div>
            <div class="my-1" v-html="op" v-for="op in script"></div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="text-center text-truncate lead">{{ $tc("tx.outputScript", outputScript.length) }}</div>
        <div class="scriptBox my-2" v-for="script in outputScript" v-if="script">
          <div class="my-1" v-html="op" v-for="op in script"></div>
        </div>
      </div>
    </div>
  </div>
  </transition>

</div>

</div>

</template>

<script>
import CONFIG from "../config";

import Loading from "../component/loading.vue";
import Tx from "../component/transaction.vue";

import Socket from "../socket";
import request from "../request";
import util from "../util";
import script from "../util/script";
import OP from "../util/opcode";

import moment from "moment";
import BigNumber from 'bignumber.js';


export default {
  data(){
    return {
      loaded : false,
      showScript:false,
      tx : {
        vin : [],
        vout : []
      }
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
    "$route": "fetchData"
  },
  methods: {
    async fetchData(){
      this.reset();
      this.$root.setTitle(this.$t("word.transaction"), this.$route.params.txid);
      
      if(!util.isHash(this.$route.params.txid)){
        this.$router.replace(`/404`);
        return;
      }

      let res = await request(`/tx/${this.$route.params.txid}`).catch(v => false);
      
      if(!res){
        this.$router.replace(`/404`);
        return;
      }
      
      this.tx = res;
      this.loaded = true;
    },
    handleMessage(msg){

    },
    valueConvertion(value) {
      return util.valueConvertion(value);
    },
    reset(){
      Object.assign(this.$data, this.$options.data());
    },
    styleScript(array){
      let result = [];
     
      for(let i = 0; i < array.length; i++){
        if(array[i] instanceof OP){
          if(array[i].toString().slice(0, 11) === "OP_PUSHDATA"){
            let str = `<span class="font-weight-bold ${array[i].type}">${array[i].toString()}</span>:${array[i+1].toString("hex")}`;
            result.push(str);
            i++;
          }else{
            result.push(`<span class="font-weight-bold ${array[i].type}">${array[i].toString()}</span>`);
          }
        }
      }
      return result;
    }
  },
  computed: {
    confirmationsColor() {
      return {
        "text-danger" : this.confirmations < 6,
        "text-success" : this.confirmations >= 6
      }
    },
    confirmations(){
      return this.tx.confirmations || 0;
    },
    satoshiByte(){
      if(this.tx.isCoinBase)
        return 0;
        
      return new BigNumber(this.tx.fees).dividedBy(this.tx.size).dividedBy(0.00000001).toFixed(0);
    },
    inputScript(){
      let vin = this.tx.vin;
      let res = [];
      if(!this.tx.isCoinBase){
        vin.forEach((data, index) => {
          res[index] = {};
          if(data.txinwitness){
            res[index].witness = data.txinwitness;
          }
          if(data.scriptSig.hex){
            res[index].script = this.styleScript(script.parseScript(new Buffer(data.scriptSig.hex, "hex")));
          }
        });
      }
      return res;
    },
    outputScript(){
      let vout = this.tx.vout;
      let res = [];
      vout.forEach((data, index) => {
        if(data.scriptPubKey.hex){
          res[index] = this.styleScript(script.parseScript(new Buffer(data.scriptPubKey.hex, "hex")));
        }
      });
      return res;
    },
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
