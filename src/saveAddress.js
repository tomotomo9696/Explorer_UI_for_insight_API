import Vue from "vue";
import util from "./util";

const saveAddr = new Vue({
  data(){
    return {
      list : [],
      keyName : "addressList",
      support : !!window.localStorage
    }
  },
  created(){
    if(this.support)
      this.load();
  },
  methods:{
    add(addr){
      if(!this.support)
        return false;
        
      addr = addr.trim();

      if(!util.addressType(addr))
        return false;
        
      console.log(this.list.indexOf(addr) );

      if(this.list.indexOf(addr) !== -1)
        return false;

      this.list.push(addr);
      this.update();
      return true;
    },
    delete(addr){
      if(!this.support)
        return false;

      addr = addr.trim();

      if(!util.addressType(addr))
        return false;

      if(this.list.indexOf(addr) === -1)
        return false;

      this.list = this.list.filter(x => x !== addr);
      this.update();
    },
    get(){
      if(!this.support)
        return [];

      return this.list;
    },
    load(){
      let list = localStorage.getItem(this.keyName);
      if(!list)
        return [];
        
      this.list = list.split(",").filter(x => util.addressType(x));
    },
    update(){
      localStorage.setItem(this.keyName, this.list.join(","));
    }
  }
});

export default saveAddr;
