<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">BitZeny explorer</router-link>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-controls="navber" aria-expanded="false" aria-label="">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="navbar-collapse collapse" id="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/blocks" @click.native="blur">{{ $t('blocks.title') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/status" @click.native="blur">{{ $t('status.title') }}</router-link>
        </li>
        <!--li class="nav-item">
          <a class="nav-link" href="#">{{ $t('word.status') }}</a>
        </li-->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="tools" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="blur">
            {{ $t("header.tools") }}  
          </a>
          <div class="dropdown-menu" aria-labelledby="tools">
            <router-link class="btn btn-link dropdown-item" to="/broadcast" @click.native="blur">{{ $t('broadcast.title') }}</router-link>
            <router-link class="btn btn-link dropdown-item" to="/scanqr" @click.native="blur">{{ $t('scanqr.title') }}</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="selectLang" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="blur">
            <i class="material-icons md-default align-top">language</i>  
          </a>
          <div class="dropdown-menu" aria-labelledby="selectLang">
            <button type="button" class="btn btn-link dropdown-item" @click.prevent="$root.changeLocale('ja')">日本語</button>
            <button type="button" class="btn btn-link dropdown-item" @click.prevent="$root.changeLocale('en')">English</button>
          </div>
        </li>
      </ul>
      <save-address></save-address>
      <header-status class="d-none d-xl-block"></header-status>
      <header-search></header-search>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
#selectLang{
  outline-color : transparent;
}
</style>

<script>
import Search from './search.vue';
import Status from './headerStatus.vue';
import SaveAddr from './saveAddress.vue';

export default {
  data: () => {
    return {}
  },
  methods : {
    blur(e){
      e.target.blur();
    }
  },
  components: {
    'header-search': Search,
    'header-status': Status,
    'save-address': SaveAddr
  }
}
</script>
