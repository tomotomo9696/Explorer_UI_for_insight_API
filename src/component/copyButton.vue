<template>
  <i class="material-icons md-default align-top copy-button" @click="copy" v-tooltip="{
    content : tooltipMessage,
    show : showTooltip,
    trigger : 'manual',
    placement : 'bottom'
  }">content_copy</i>
</template>

<style lang="css" scoped>
.copy-button {
  cursor: pointer;
}
</style>

<script>
export default {
  data(){
    return {
      showTooltip : false,
      success : false,
      timeoutID : 0
    }
  },
  props: ["content"],
  computed: {
    tooltipMessage(){
      return this.$t(this.success ? "copyButton.copied" : "copyButton.copyFailed");
    }
  },
  methods: {
    copy(e){
      clearTimeout(this.timeoutID);
      this.$copyText(this.content).then(e => {
        this.success = true;
        this.triggerTooltip();
      }).catch(e => {
        this.success = false;
        this.triggerTooltip();
      });
    },
    triggerTooltip(){
      this.showTooltip = true;
      this.timeoutID = setTimeout(() => {
        this.showTooltip = false;
      }, 2000);
    }
  }
}
</script>
