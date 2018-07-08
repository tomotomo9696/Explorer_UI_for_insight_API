const langs = [
  "ja",
  "en"
];

let obj = {};

for(let lang of langs){
  obj[lang] = require(`./locales/${lang}.js`);
}

module.exports = obj;
