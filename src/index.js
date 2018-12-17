import 'bootstrap';
import './scss/index.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';
import VueLocalStorage from "vue-localstorage";
import VueClipboard from "vue-clipboard2";
import VTooltip from "v-tooltip";
import VueHeadful from "vue-headful";

import Header from './component/Header.vue';
import SaveAddrModal from './component/saveAddressModal.vue';

import langs from './languages';

import CONFIG from './config';

import moment from "moment";

Vue.use(VueCookie);
Vue.use(VueLocalStorage);
Vue.use(VueClipboard);
Vue.use(VTooltip);

//language
const browserLang = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || "en";

moment.locale(browserLang);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: browserLang,
  fallbackLocale: "en",
  messages: langs
});


//router
Vue.use(VueRouter);
import routes from './routes';
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

Vue.directive('scrolled', {
  bind: function (el, binding, vnode) {
    const handler = () => {
      if((window.innerHeight + window.pageYOffset) >= window.document.body.offsetHeight){
        binding.value();
      }
    }
    window.addEventListener('scroll', handler);
  }
});

Vue.component("vue-headful", VueHeadful);
Vue.component("app-header", Header);
Vue.component("save-address-modal", SaveAddrModal);

new Vue({
  el: '#app',
  i18n: i18n,
  data(){
    return {
      lang : "en",
      title : {
        str : CONFIG.name,
        key : "",
        data : ""
      }
    }
  },
  created(){
    let cookieLang = this.$cookie.get("lang");
    let lang = cookieLang || browserLang;
    this.changeLocale(lang);
  },
  methods : {
    setTitle(key, data = ""){
      const pageName = this.$t(key);
      data = data ? ` ${data}` : "";
      this.title = {
        str : `${pageName}${data} | ${CONFIG.name}`,
        key : key,
        data : data
      }
    },
    changeLocale(locale){
      if(!locale)
        return;
      this._i18n.locale = locale;
      moment.locale(locale);
      this.lang = locale;

      const pageName = this.$t(this.title.key);
      this.title.str = `${pageName}${this.title.data} | ${CONFIG.name}`;
      
      this.$cookie.set("lang", locale, { expires: '1Y' });

      this.$emit("changedLocale", locale);
    }
  },
  router
});

