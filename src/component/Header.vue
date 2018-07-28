<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">BitZeny explorer</router-link>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-controls="navber" aria-expanded="false" aria-label="">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="navbar-collapse collapse" id="navbar">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/blocks">{{ $t('blocks.title') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/broadcast">{{ $t('broadcast.title') }}</router-link>
        </li>
        <!--li class="nav-item">
          <a class="nav-link" href="#">{{ $t('word.status') }}</a>
        </li-->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="selectLang" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Language  
          </a>
          <div class="dropdown-menu" aria-labelledby="selectLang">
            <button type="button" class="btn btn-link dropdown-item" @click.prevent="$root.changeLocale('ja')">日本語</button>
            <button type="button" class="btn btn-link dropdown-item" @click.prevent="$root.changeLocale('en')">English</button>
          </div>
        </li>
      </ul>
      <header-status class="d-none d-lg-block"></header-status>
      <header-search></header-search>
    </div>
  </nav>
</template>

<script>
import Search from './search.vue';
import Status from './headerStatus.vue';

export default {
  data: () => {
    return {}
  },
  components: {
    'header-search': Search,
    'header-status': Status
  }
}
</script>
