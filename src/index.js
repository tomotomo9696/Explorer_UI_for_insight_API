import 'bootstrap';
import './scss/index.scss';



import Vue from 'vue';
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n';

import Header from './component/Header.vue';

import langs from './languages';

import config from './config';

import moment from "moment";

//language
const lang = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage;

moment.locale(lang);


Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: lang,
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
  data : Object.assign(config, {title : config.name}),
  methods : {
    setTitle(page, data){
      data = data ? ` ${data}` : "";
      this.title = `${page}${data} | ${this.$root.name}`;
    },
    changeLocale(locale){
      if(!locale)
        return;
      this._i18n.locale = locale;
      moment.locale(locale);
      this.$emit("changedLocale", locale);
    }
  },
  router
});

