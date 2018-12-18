<template>

<div class="tx-box">
  <div class="row" v-if="isList">
    <div class="col-12">
      <div class="copy-button-container">
        <div class="copy-button-item-data text-truncate">
          <router-link :to="`/tx/${tx.txid}`">{{tx.txid}}</router-link>
        </div>
        <div class="copy-button-item-button">
          <i class="material-icons md-default align-top copy-button" v-clipboard:copy="tx.txid">content_copy</i>
        </div>
      </div>
    </div>
  </div>
  
  <hr v-if="isList">
    
  <div class="row">    
    <div class="col-lg-5">
      <div class="text-center">{{ $tc("tx.inputs", tx.isCoinBase ? 0 : tx.vin.length, {count : tx.vin.length}) }}</div>
      <div v-for="vin in vin.slice(0, vinShowAll ? vin.length : 5)" class="panel-address">
        <div class="text-truncate">
          <span v-if="vin.addr === currentAddr">{{vin.addr}}</span>
          <router-link :to="`/address/${vin.addr}`" v-else-if="vin.addr">{{vin.addr}}</router-link>
        </div>
        <div v-if="tx.isCoinBase">{{ $t("tx.coinbase") }}</div>
        
        <div v-if="vin.addr" class="text-right">{{ valueConvertion(vin.value) }}</div>
      </div>
      <div v-if="vin.length > 5" class="text-center toggle-button" @click="toggleVin">
        <i class="material-icons" v-if="!vinShowAll">keyboard_arrow_down</i>
        <i class="material-icons" v-if="vinShowAll">keyboard_arrow_up</i>
      </div>
    </div>
    <div class="col-lg-2 text-center my-auto">
      <div class="d-lg-none"><i class="material-icons">keyboard_arrow_down</i></div>
      <div class="d-none d-lg-block"><i class="material-icons">keyboard_arrow_right</i></div>
    </div>
    <div class="col-lg-5">
      <div class="text-center">{{ $tc("tx.outputs", tx.vout.length, {count : tx.vout.length}) }}</div>
      <div v-for="vout in vout.slice(0, voutShowAll ? vout.length : 5)">
        <div class="panel-address">
          <div v-for="addr in vout.scriptPubKey.addresses" :key="addr" class="text-truncate">
            <span v-if="addr === currentAddr">{{addr}}</span>
            <router-link :to="`/address/${addr}`" v-else>{{addr}}</router-link>
          </div>
          <div v-if="vout.scriptPubKey.message"><i class="material-icons align-top">chat</i> <span>{{vout.scriptPubKey.message}}</span></div>
          <div class="text-right" v-if="!vout.scriptPubKey.message">{{ valueConvertion(vout.value) }}</div>
        </div>
      </div>
      <div v-if="vout.length > 5" class="text-center toggle-button" @click="toggleVout">
        <i class="material-icons" v-if="!voutShowAll">keyboard_arrow_down</i>
        <i class="material-icons" v-if="voutShowAll">keyboard_arrow_up</i>
      </div>
    </div>
  </div>
  
  <hr v-if="isList">
  
  <div class="row" v-if="isList">
    <div class="col-6">
      <span v-if="tx.fees">{{ $t("tx.fee") }}:{{ valueConvertion(tx.fees) }}</span>
    </div>
    <div class="col-6 text-right">
      <span>{{ $t("tx.valueOut") }}:{{ valueConvertion(tx.valueOut) }}</span>
    </div>
  </div>
</div>

</template>

<style lang="scss" scoped>
.tx-box{
  background-color: $block-background-color;
  overflow: hidden;
  padding: 10px;
  margin: 2em 0px;
  box-shadow:2px 2px 10px 2px $shadow-color;
}

.panel-address{
  background-color: #FFF;
  overflow: hidden;
  padding: 0.5em 1em;
  border-radius: 4px;
  border: 1px solid $border-color;
  margin: 8px 0px;
  
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script>
import CONFIG from "../config";

import util from "../util";
import script from "../util/script";
import OP from "../util/opcode";
import hash from "../util/hash";
import segwit_addr from "../lib/segwit_addr";

import {Buffer} from "buffer/";


export default {
  data(){
    return {
      vinShowAll : false,
      voutShowAll : false
    }
  },
  computed:{
    vin(){
      let vin = this.tx.vin;
      if(!this.tx.isCoinBase){
        vin.forEach((data, i) => {
          if(!data.value && data.value !== 0){
            vin[i].value = "error";
          }
          if(!data.addr && !data.scriptSig.hex){
            if(!data.txinwitness){
              vin[i].addr = "Unparsed address";
            }else{
              let buf = new Buffer(data.txinwitness[data.txinwitness.length-1], "hex");
              buf =  buf.length === 33 ? hash.hash160(buf) : hash.sha256(buf);
              vin[i].addr = segwit_addr.encode(CONFIG.bech32, 0, buf);
            }
          }
        });
      }
      return vin;
    },
    
    vout(){
      let vout = this.tx.vout;
      vout.forEach((data, i) => {
        
        //bech32
        if(!data.scriptPubKey.addresses){
          let buf = new Buffer(data.scriptPubKey.hex, "hex");
          let stack = script.parseScript(buf);
          if(stack.length === 3 && stack[0] == OP._0 && (stack[2].length === 20 || stack[1].length === 32)){
            vout[i].scriptPubKey.addresses = [segwit_addr.encode(CONFIG.bech32, 0, stack[2])];
          }
        }
        
        //OP_RETURN message
        if(data.scriptPubKey && data.scriptPubKey.type === "nulldata"){
          let decoded = this._decodeMessage(data.scriptPubKey.hex);
          if (decoded) {
            vout[i].scriptPubKey.message = this.tx.isCoinBase && decoded.slice(0, 8) === "aa21a9ed" ? this.$t("tx.segwitCommitment") : decoded; 
          }
        }
      });
      return vout;
    }
  },
  methods: {
    _decodeMessage: function (hex) {
      let res = false;
      let buf = new Buffer(hex, "hex");
      let scriptResult = script.parseScript(buf);

      if(scriptResult[0] == OP._RETURN && 0x01 <= scriptResult[1] && scriptResult[1] <= 0x4e && scriptResult[2] instanceof Buffer){
        let hex = scriptResult[2].toString("hex");
        let textdecoder = new TextDecoder("utf-8");
        let str = textdecoder.decode(scriptResult[2]);
        let isText = !str.includes(String.fromCharCode(65533));
        res = isText ? str : hex;
      }
      return res;
    },
    toggleVin: function () {
      this.vinShowAll = !this.vinShowAll;
    },
    toggleVout: function () {
      this.voutShowAll = !this.voutShowAll;
    },
    valueConvertion(value) {
      return util.valueConvertion(value);
    }
  },
  props: {
    tx : Object,
    isList : Boolean,
    currentAddr : String
  }
}
</script>
