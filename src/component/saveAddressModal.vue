<template>
  <div class="modal fade" id="saveAddressModal" tabindex="-1" role="dialog" aria-labelledby="saveAddressModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="saveAddressModalLabel">{{ $t("saveAddress.modalTitle") }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                {{ $t("saveAddress.description") }}
              </div>
            </div>
            <hr>
            <div class="row my-4">
              <div class="col-12">
                <table class="table addr-table">
                  <thead>
                    <tr v-if="list.length !== 0">
                      <th @click="onCheckBoxClick" class="text-center align-middle">
                        <input type="checkbox" class="align-middle" v-model="selectAll">
                      </th>
                      <th class="text-right"><button type="button" class="btn btn-danger btn-sm" @click="deleteAddress">{{ $t("saveAddress.delete") }}</button></th>
                    </tr>
                    <tr v-else colspan="2"><th></th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="addr in list">
                      <td @click="onCheckBoxClick" class="text-center"><input type="checkbox" class="align-middle" :value="addr" v-model="selected"></td>
                      <td class="text-right"><router-link @click.native="onLinkClick()" :to="`/address/${addr}`">{{ addr }}</router-link></td>
                    </tr>
                    <tr v-if="list.length === 0" colspan="2"><td>{{ $t("saveAddress.notFound") }}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-12 mb-2">
                <div class="input-group">
                  <input class="form-control" type="text" :placeholder="$t('saveAddress.placeholder')" v-model="address">
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button" @click="add">{{ $t("saveAddress.save") }}</button>
                  </div>
                </div>
              </div>
              <div class="col-12">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.addr-table {
  width : 100%;
}

.addr-table > thead > tr > th{
  border-top: none;
}
</style>

<script>
import util from "../util";

export default {
  data(){
    return {
      list : [],
      address : "",
      selected : []
    }
  },
  created(){
    this.get();
    
    $("#saveAddressModal").on("shown.bs.modal", this.onModalOpen);
  },
  computed: {
    selectAll: {
      get(){
        return this.list.length === 0 ? false : this.list.length === this.selected.length;
      },
      set(value){
        this.selected = value ? this.list.slice() : [];
      }
    }
  },
  watch: {
    list(){
      this.$localStorage.set("addressList", this.list.join(","));
    }
  },
  methods: {
    get(){
      this.list = this.$localStorage.get("addressList", "").split(",").filter(x => util.addressType(x));
    },
    add(){
      if(!util.addressType(this.address))
        return false;

      if(this.list.indexOf(this.address) !== -1)
        return false;
      
      this.list.push(this.address);
      this.address = "";
    },
    deleteAddress(){
      if(!window.confirm(`${this.$t("saveAddress.confirm")}\n\n${this.selected.join("\n")}`))
        return false;

      this.list = this.list.filter(x => this.selected.indexOf(x) === -1);
        
      this.selected = [];
    },
    onModalOpen(){
      this.get();
    },
    onLinkClick(){
      $("#saveAddressModal").modal("hide");
    },
    onCheckBoxClick(e){
      $(e.target).children('input[type="checkbox"]').trigger("click");
      e.stopPropagation();
    }
  }
}
</script>
