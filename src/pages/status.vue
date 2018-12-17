<template>

<div>
<loading v-if="!loaded"></loading>

<div class="row" v-if="loaded">
  <div class="mb-4 col-12">
    <div><span class="title">{{ $t("status.title") }}</span></div>
  </div>
  
  <div class="mb-4 col-12">
    <div class="row">
      <div class="col-lg-8">
        <table class="table status-table">
          <thead>
            <tr><th colspan="2">{{ $t("status.syncStatus") }}</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ $t("status.syncProgress") }}</th>
              <td>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="sync.syncPercentage" aria-valuemin="0" aria-valuemax="100" :style="{width: `${sync.syncPercentage}%`}">{{ sync.syncPercentage }}%</div>
                </div>
              </td>
            </tr>
            <tr>
              <th>{{ $t("status.status") }}</th>
              <td>{{ sync.status }}</td>
            </tr>
            
            <tr>
              <th>{{ $t("status.startTime") }}</th>
              <td>{{ sync.startTs | formatTimestamp }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.endTime") }}</th>
              <td>{{ sync.endTs | formatTimestamp }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.startBlock") }}</th>
              <td>
                <router-link v-if="sync.blockChainHeight" :to="`/block-height/${sync.blockChainHeight}`" >{{ sync.blockChainHeight }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table hash-table">
          <thead>
            <tr><th></th><th></th></tr>
            <tr><th colspan="2">{{ $t("status.lastBlock") }}</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ $t("status.lastBlockCoind") }}</th>
              <td class="text-truncate">
                <router-link v-if="lastBlock.lastblockhash" :to="`/block/${lastBlock.lastblockhash}`" >{{ lastBlock.lastblockhash }}</router-link>
              </td>
            </tr>
            <tr>
              <th>{{ $t("status.lastBlockInsight") }}</th>
              <td class="text-truncate">
                <router-link v-if="lastBlock.syncTipHash" :to="`/block/${lastBlock.syncTipHash}`" >{{ lastBlock.lastblockhash }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <table class="table status-table">
          <thead>
            <tr><th colspan="2">{{ $t("status.nodeStatus") }}</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ $t("status.version") }}</th>
              <td>{{ nodeInfo.version }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.protocolVersion") }}</th>
              <td>{{ nodeInfo.protocolversion }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.blocks") }}</th>
              <td>
                <router-link v-if="nodeInfo.blocks" :to="`/block-height/${nodeInfo.blocks}`" >{{ nodeInfo.blocks }}</router-link>
              </td>
            </tr>
            <tr>
              <th>{{ $t("status.timeOffset") }}</th>
              <td>{{ nodeInfo.timeoffset }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.connections") }}</th>
              <td>{{ nodeInfo.connections }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.difficulty") }}</th>
              <td>{{ nodeInfo.difficulty }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.network") }}</th>
              <td>{{ nodeInfo.testnet ? "Testnet" : "Livenet" }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.proxy") }}</th>
              <td>{{ nodeInfo.proxy }}</td>
            </tr>
            <tr>
              <th>{{ $t("status.infoErrors") }}</th>
              <td>{{ nodeInfo.infoErrors }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</div>

</template>

<style lang="css">
.status-table > thead > tr > th,
.hash-table > thead > tr > th{
  border: none;
  font-weight: 600;
  font-size: 2em;
}

.status-table td,
.hash-table td{
  text-align: right;
}

.hash-table {
  table-layout: fixed;
  width: 100%;
}

.hash-table > thead > tr:first-child {
  height: 0;
}

.hash-table > thead > tr:first-child > th {
  padding:0;
}

.hash-table > thead > tr:first-child > th:nth-child(2) {
  width: calc(100% / 1.5);
}


</style>

<script>
import Loading from "../component/loading.vue";

import request from "../request";

import moment from "moment";

export default {
  data(){
    return {
      nodeInfo     : {},
      sync         : {},
      lastBlock     : {},
      loaded       : false,

    }
  },
  created(){
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData(){
      this.reset();
      this.$root.setTitle("status.title");
      
      let res = await request(`/sync`).catch(v => false);
      if(!res)
        return false;
      this.sync = res;

      res = await request(`/status?q=getInfo`).catch(v => false);
      if(!res)
        return false;
      this.nodeInfo = res.info;

      res = await request(`/status?q=getLastBlockHash`).catch(v => false);
      if(!res)
        return false;
      this.lastBlock = res;

      this.loaded = true;
    },
    reset () {
      Object.assign(this.$data, this.$options.data());
    }
  },
  filters: {
    formatTimestamp(ts) {
      return moment(ts / 1000, "X").format("LLL");
    }
  },
  components: {
    "loading": Loading
  }
}
</script>
