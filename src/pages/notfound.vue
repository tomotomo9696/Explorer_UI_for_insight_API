<template>

<div>
  <div class="title">{{ $t("error.notFound") }}</div>
</div>

</template>

<script>

export default {
  data(){
    return {
    }
  },
  created(){
    this.$root.setTitle("404 Not found");
  }
}
</script>
