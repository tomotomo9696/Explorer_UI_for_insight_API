<template>
  <div class="header-status mr-2">
    <span>{{ $t("word.blockHeight") }} : {{ height }}</span>
  </div>
</template>

<script>
import Socket from "../socket";
import request from "../request";

export default {
  data(){
    return {
      height : 0
    }
  },
  created(){
    Socket.$on("blockHeight", this.handleMessage);
    this.fetchData();
  },
  beforeDestroy(){
    Socket.$off("blockHeight", this.handleMessage);
  },
  methods: {
    async fetchData(){
      let res = await request(`${this.$root.endpoint}/status?q=getInfo`).catch(v => false);
      if(res)
        this.height = Math.max(this.height, res.info.blocks);
    },
    handleMessage(msg){
      this.height = Math.max(this.height, msg);
    }
  }
}
</script>

