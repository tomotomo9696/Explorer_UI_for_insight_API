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
    <qrcode-stream @decode="onDecode" @init="onInit" :camera="camera"></qrcode-stream>
  </div>
</div>

</template>


<script>
import CONFIG from "../config";

import util from "../util";

import { QrcodeStream } from "vue-qrcode-reader";

export default {
  data(){
    return {
      camera : "auto",
      errorKey : ""
    }
  },
  created(){
    this.$root.setTitle("scanqr.title");
  },
  methods:{
    async onInit(promise){
      try {
        await promise;
      }catch (error){
        if(error.name === "NotAllowedError"){
          this.errorKey = "scanqr.notAllowed";

        }else if(error.name === "NotFoundError"){
          this.errorKey = "scanqr.deviceNotFound";

        }else if(error.name === "NotSupportedError"){
          this.errorKey = "scanqr.notSupported";

        }else if(error.name === "NotReadableError"){
          this.errorKey = "scanqr.notReadable";

        } else {
          this.errorKey = "scanqr.error";
        }
      }
    },
    onDecode(data){
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
        this.camera = "off";
        this.$router.push({ path : `/address/${address}` });
      }else{
        this.error = this.$t("scanqr.addressNotFound");
      }
    }
  },
  computed: {
    error(){
      return this.$t(this.errorKey);
    }
  },
  components: {
    QrcodeStream
  }
}
</script>
