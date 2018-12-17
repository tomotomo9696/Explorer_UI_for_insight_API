<template>

<div>
<loading v-if="!loaded"></loading>

<div class="row" v-if="loaded">
  <div class="mb-4 col-12">
    <div><span class="title">{{ $t("blocks.title") }}</span><span class="ml-2">{{ date }} UTC</span></div>
  </div>
  
  <div class="mb-4 col-12">
    <div class="row">
      <div class="col-6 col-lg-5 text-left d-none d-lg-block">
        <router-link v-if="prevDate" :to="`/blocks/${prevDate}`" tag="button" type="button" class="btn btn-outline-primary">
          < {{ prevDate }}
        </router-link>
      </div>
      <div class="col-12 col-lg-2 text-center"><datepicker v-model="selectedDate" :bootstrap-styling="true" :language="locale" :format="'yyyy-MM-dd'" :calendar-class="'datepicker_center'" @input="dateChanged"></datepicker></div>
      <div class="col-6 col-lg-5 text-right d-none d-lg-block">
        <router-link v-if="nextDate" :to="`/blocks/${nextDate}`" tag="button" type="button" class="btn btn-outline-primary">
          {{ nextDate }} >
        </router-link>
      </div>
    </div>
  </div>
  
  <div class="mb-2 col-12 table-responsive">
    <table class="table block-list-table">
      <thead>
        <tr><th>{{ $t("word.blockHeight") }}</th><th>{{ $t("block.minedTime") }}</th><th>{{ $t("word.transactionCount") }}</th><th class="d-none d-lg-table-cell">{{ $t("block.minedBy") }}</th><th>{{ $t("word.size") }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(block, i) in blocks">
          <td><router-link :to="`/block/${block.hash}`">{{block.height}}</router-link></td>
          <td>{{ block.time | formatTimestamp }}</td>
          <td>{{ block.txlength }}</td>
          <td class="d-none d-lg-table-cell"><a v-if="block.poolInfo" :href="block.poolInfo.url">{{ block.poolInfo.poolName }}</a></td>
          <td>{{ block.size }} byte</td>
        </tr>
        <tr v-if="!blocks.length && loaded">
          <td colspan="5">{{ $t("blocks.notFound") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div :class="{invisible: !loading}" class="mb-2 col-12">
    <div class="progress my-2">
      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading...</div>
    </div>
  </div>

  <div class="mb-2 col-12 text-center">
    <button type="button" class="btn btn-primary" @click="loadMore" v-if="!loadedAll" :disabled="loading">{{ $t("blocks.loadMore") }}</button>
  </div>
</div>

</div>

</template>

<script>
import Loading from "../component/loading.vue";

import request from "../request";

import moment from "moment";

import Datepicker from 'vuejs-datepicker';
import * as dpLocale from "vuejs-datepicker/dist/locale";

export default {
  data(){
    return {
      blocks       : [],
      loading      : false,
      loaded       : false,
      loadedAll    : false,
      date         : null,
      ts           : null,
      selectedDate : new Date(),
      prevDate     : null,
      nextDate     : null,
      locale       : dpLocale["en"]
    }
  },
  created(){
    this.$root.$on("changedLocale", this.changeLocale);
    this.fetchData();
  },
  mounted(){
    this.changeLocale(this.$i18n.locale);
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    //TODO : 日にちでの照会がUTCオンリーなのでどうにかする
    async fetchData(){
      this.reset();
      this.changeLocale(this.$i18n.locale);
      this.$root.setTitle("blocks.title", this.$route.params.blockid);

      let date = this.$route.params.date;
      let today = moment();

      if(!date){
        this.$router.replace(`/blocks/${today.utc().format("YYYY-MM-DD")}`);
        return;
      }
      

      if(!moment(date, "YYYY-MM-DD", true).isValid()){
        this.$router.replace(`/404`);
        return;
      }

      this.date = date;
      date = moment(date);
      this.selectedDate = date.toDate();
      this.prevDate = date.subtract(1, "d").format("YYYY-MM-DD");
      this.nextDate = date.add(2, "d").format("YYYY-MM-DD");

      if(today.utc().format("YYYY-MM-DD") < this.nextDate)
        this.nextDate = null;
      
      await this.loadMore();
      this.loaded = true;
    },
    async loadMore(){
      if(this.loadedAll)
        return;
        
      this.loading = true;
        
      const date = this.date;

      const res = await request(`/blocks?blockDate=${date}${this.ts ? "&startTimestamp=" + this.ts : ""}`).catch(v => false);
      
      if(!res){
        this.$router.replace(`/404`);
        return;
      }
      
      if(date !== this.date)
        return this.loading = false;
      
      this.blocks = [...this.blocks, ...res.blocks].filter((x, i, self) => self.findIndex(({hash}) => hash === x.hash) === i);
      this.loadedAll = !res.pagination.more;
      this.ts = res.pagination.moreTs;
      return this.loading = false;
    },
    changeLocale(locale) {
      this.locale = dpLocale[locale] || dpLocale["en"];
    },
    dateChanged(){
      this.$router.push(`/blocks/${moment(this.selectedDate).format("YYYY-MM-DD")}`);
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  },
  filters: {
    formatTimestamp(ts) {
      return moment(ts, "X").format("LLL");
    }
  },
  components: {
    "loading": Loading,
    "datepicker" : Datepicker
  }
}
</script>
