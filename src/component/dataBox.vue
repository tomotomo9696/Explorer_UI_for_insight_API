<template>
  <div class="data-wrapper text-muted">
    <div class="data-box text-truncate">
      {{content}}
    </div>
    <div class="button-box">
      <copy-button :content="content"></copy-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-wrapper {
  display: flex;
}
.data-box {
  max-width: calc(100% - #{$font-size-base-icon});
  flex-basis: auto;
  flex-grow: 0;
}
.button-box {
  min-width: $font-size-base-icon;
  flex-basis: $font-size-base-icon;
  margin-left: 0.5em;
  flex-grow: 1;
}
</style>

<script>
import copyButton from "./copyButton.vue";

export default {
  props: ["content"],
  components: {
    "copy-button": copyButton
  }
}
</script>
