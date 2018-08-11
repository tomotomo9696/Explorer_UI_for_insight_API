import 'bootstrap';
import './scss/index.scss';
import 'material-design-icons/iconfont/material-icons.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';

import Header from './component/Header.vue';

import langs from './languages';

import CONFIG from './config';

import moment from "moment";

Vue.use(VueCookie);

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

Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
});

Vue.component("app-header", Header);

new Vue({
  el: '#app',
  i18n: i18n,
  data(){
    return {
      title : CONFIG.name
    }
  },
  created(){
    let cookieLang = this.$cookie.get("lang");
    let lang = cookieLang || browserLang;
    this.changeLocale(lang);
  },
  methods : {
    setTitle(page, data){
      data = data ? ` ${data}` : "";
      this.title = `${page}${data} | ${CONFIG.name}`;
    },
    changeLocale(locale){
      if(!locale)
        return;
      this._i18n.locale = locale;
      moment.locale(locale);

      this.$cookie.set("lang", locale, { expires: '1Y' });

      this.$emit("changedLocale", locale);
    }
  },
  router
});

