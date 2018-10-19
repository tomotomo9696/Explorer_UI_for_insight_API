<template>

<div class="row">
  <div class="mb-1 col-12">
    <div class="title">{{ $t("scanqr.title") }}</div>
  </div>
  
  <div class="mb-2 col-12">
    {{ $t("scanqr.description") }}
  </div>
  
  <div class="mb-2 col-12 font-weight-bold text-danger" v-if="error">
    {{ error }}
  </div>
  
  <div class="col-12">
    <qrcode-reader @decode="onDecode" @init="onInit" :camera="camera" :paused="paused"></qrcode-reader>
  </div>
</div>

</template>


<script>
import CONFIG from "../config";

import util from "../util";

import { QrcodeReader } from "vue-qrcode-reader";

export default {
  data(){
    return {
      camera : {},
      paused : false,
      error : ""
    }
  },
  methods:{
    async onInit(promise){
      try {
        await promise;
      }catch (error){
        if(error.name === "NotAllowedError"){
          this.error = this.$t("scanqr.notAllowed");

        }else if(error.name === "NotFoundError"){
          this.error = this.$t("scanqr.deviceNotFound");

        }else if(error.name === "NotSupportedError"){
          this.error = this.$t("scanqr.notSupported");

        }else if(error.name === "NotReadableError"){
          this.error = this.$t("scanqr.notReadable");

        } else {
          this.error = this.$t("scanqr.error");
        }
      }
    },
    onDecode(data){
      this.paused = true;
      let address = "";

      if(data.indexOf(CONFIG.scheme) === 0){
        let parsedURI = util.parseBitcoinUri(data, CONFIG.scheme);
        if(parsedURI)
          address = parsedURI.address;
      }else{
        if(util.addressType(data))
          address = data;
      }
      
      if(address){
        this.camera = false;
        this.$router.push({ path : `/address/${address}` });
      }else{
        this.paused = false;
        this.error = this.$t("scanqr.addressNotFound");
      }
    }
  },
  components: {
    QrcodeReader
  }
}
</script>
