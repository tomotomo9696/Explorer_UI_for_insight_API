<template>

<div>
  <loading></loading>
</div>

</template>

<script>
import Loading from "../component/loading.vue";

import request from "../request";


export default {
  data(){
    return {
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created(){
    this.fetchData();
  },
  methods: {
    async fetchData(){
      if(!this.$route.params.blockHeight){
        this.$router.replace(`/404`);
        return;
      }
      
      let res = await request(`/block-index/${this.$route.params.blockHeight}`).catch(v => false);
      
      if(!res){
        this.$router.replace(`/404`);
      }else{
        this.$router.replace(`/block/${res.blockHash}`);
      }
    }
  },
  components: {
    "loading": Loading
  }
}
</script>
