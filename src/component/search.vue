<template>
  <div class="col-12 col-lg-4 px-0">
    <div class="input-group col-12 px-0">
      <div class="input-group-prepend ">
        <span class="input-group-text"><i class="material-icons md-default">search</i></span>
      </div>
      <input class="form-control" type="search" :placeholder="$t('header.search.placeholder')" @keyup.enter="search" v-model="searchString">
    </div>
  </div>
</template>


<script>
import CONFIG from "../config";

import request from "../request";


export default {
  data(){
    return {
      searchString : ""
    }
  },
  methods: {
    async search(){
      let ss = this.searchString.trim();
      if(!ss)
        return;
        
      let searchList = [];
      let result = "";
      
      if(/^([A-Fa-f0-9]{64})$/i.test(ss)){
        if(ss.slice(0, 4) === "0000"){
          searchList.push(...["block", "tx"]);
        }else{
          searchList.push(...["tx", "block"]);
        }
      }else if(/^\d+$/.test(ss)){
        searchList.push("block-index");
      }else{
        let addr = new RegExp(`^[${CONFIG.p2pkh}${CONFIG.p2sh}][a-km-zA-HJ-NP-Z0-9]{26,33}$`, '');
        let bech32 = new RegExp(`^${CONFIG.bech32}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,59}$`, 'i');
        if(addr.test(ss) || bech32.test(ss))
          searchList.push("addr");
      }
      
      for(let v of searchList){
        let res = await request(`/${v}/${ss}${v === "tx" ? "?noTxList=1" : ""}`).catch(err => false);
        if (!res) {
          continue;
        }
        if(v === "block-index"){
          ss = res.blockHash;
          v = "block";
        }
        if(v === "addr")
          v = "address";
        
        result = v;
        break;
      }
      console.log(result, ss);
      if(result){
        this.searchString = "";
        this.$router.push({ path : `/${result}/${ss}` });
      }
    }
  }
}
</script>
