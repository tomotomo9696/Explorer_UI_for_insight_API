(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{197:function(t,e,s){"use strict";const i={OP_0:0,OP_PUSHDATA1:76,OP_PUSHDATA2:77,OP_PUSHDATA4:78,OP_1NEGATE:79,OP_1:81,OP_2:82,OP_3:83,OP_4:84,OP_5:85,OP_6:86,OP_7:87,OP_8:88,OP_9:89,OP_10:90,OP_11:91,OP_12:92,OP_13:93,OP_14:94,OP_15:95,OP_16:96,OP_NOP:97,OP_IF:99,OP_NOTIF:100,OP_ELSE:103,OP_ENDIF:104,OP_VERIFY:105,OP_RETURN:106,OP_TOALTSTACK:107,OP_FROMALTSTACK:108,OP_2DROP:109,OP_2DUP:110,OP_3DUP:111,OP_2OVER:112,OP_2ROT:113,OP_2SWAP:114,OP_IFDUP:115,OP_DEPTH:116,OP_DROP:117,OP_DUP:118,OP_NIP:119,OP_OVER:120,OP_PICK:121,OP_ROLL:122,OP_ROT:123,OP_SWAP:124,OP_TUCK:125,OP_SIZE:130,OP_EQUAL:135,OP_EQUALVERIFY:136,OP_1ADD:139,OP_1SUB:140,OP_NEGATE:143,OP_ABS:144,OP_NOT:145,OP_0NOTEQUAL:146,OP_ADD:147,OP_SUB:148,OP_BOOLAND:154,OP_BOOLOR:155,OP_NUMEQUAL:156,OP_NUMEQUALVERIFY:157,OP_NUMNOTEQUAL:158,OP_LESSTHAN:159,OP_GREATERTHAN:160,OP_LESSTHANOREQUAL:161,OP_GREATERTHANOREQUAL:162,OP_MIN:163,OP_MAX:164,OP_WITHIN:165,OP_RIPEMD160:166,OP_SHA1:167,OP_SHA256:168,OP_HASH160:169,OP_HASH256:170,OP_CODESEPARATOR:171,OP_CHECKSIG:172,OP_CHECKSIGVERIFY:173,OP_CHECKMULTISIG:174,OP_CHECKMULTISIGVERIFY:175,OP_CHECKLOCKTIMEVERIFY:177,OP_CHECKSEQUENCEVERIFY:178};class a extends Number{constructor(t){"string"==typeof t&&(t=i[t.toUpperCase()]||-1),super(t)}get type(){return 0<=this&&this<=96?"constant":97<=this&&this<=106?"control":107<=this&&this<=125?"stack":126<=this&&this<=130?"splice":131<=this&&this<=136?"logic":139<=this&&this<=165?"arithmetic":166<=this&&this<=175?"crypto":177<=this&&this<=178&&"locktime"}valueOf(){return super.valueOf()}toString(){return 1<=this&&this<=75?"OP_PUSHDATA":Object.keys(i).filter(t=>i[t]==this)[0]||"UNKNOWN"}}Object.keys(i).forEach(t=>{Object.defineProperty(a,t.slice(2),{value:i[t]})}),t.exports=a},199:function(t,e,s){"use strict";var i=s(2),a=s(216),n=s.n(a);e.a={isHash:t=>/^([A-Fa-f0-9]{64})$/i.test(t),addressType(t){let e=new RegExp(`^${i.a.p2pkh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`,""),s=new RegExp(`^${i.a.p2sh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`,""),a=new RegExp(`^${i.a.bech32}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,59}$`,"i");return e.test(t)?"P2PKH":s.test(t)?"P2SH":!!a.test(t)&&"BECH32"},valueConvertion:t=>new n.a(t).toString(10)+` ${i.a.currencySymbol}`}},205:function(t,e,s){const i=s(197);t.exports=class{constructor(){}static parseScript(t,e){let s=[],a=0;do{let e=t.readUInt8(a);a+=1;const n=(e=new i(e)).toString();if("UNKNOWN"!==n){if(s.push(e),"OP_PUSHDATA"===n&&(s.push(t.slice(a,a+e)),a+=e),"OP_PUSHDATA1"===n){let e=t.readUInt8(a);a+=1,s.push(t.slice(a,a+e)),a+=e}if("OP_PUSHDATA2"===n){let e=t.readUInt16LE(a);a+=2,s.push(t.slice(a,a+e)),a+=e}if("OP_PUSHDATA4"===n){let e=t.readUInt32LE(a);a+=4,s.push(t.slice(a,a+e)),a+=e}}}while(t.length>a);return s}}},209:function(t,e,s){var i=s(210);function a(t,e,s,i){for(var a=0,n=0,r=[],l=(1<<s)-1,o=0;o<t.length;++o){var c=t[o];if(c<0||c>>e!=0)return null;for(a=a<<e|c,n+=e;n>=s;)n-=s,r.push(a>>n&l)}if(i)n>0&&r.push(a<<s-n&l);else if(n>=e||a<<s-n&l)return null;return r}function n(t,e){var s=i.decode(e);if(null===s||s.hrp!==t||s.data.length<1||s.data[0]>16)return null;var n=a(s.data.slice(1),5,8,!1);return null===n||n.length<2||n.length>40?null:0===s.data[0]&&20!==n.length&&32!==n.length?null:{version:s.data[0],program:n}}t.exports={encode:function(t,e,s){var r=i.encode(t,[e].concat(a(s,8,5,!0)));if(null===n(t,r))return null;return r},decode:n}},210:function(t,e){var s="qpzry9x8gf2tvdw0s3jn54khce6mua7l",i=[996825010,642813549,513874426,1027748829,705979059];function a(t){for(var e=1,s=0;s<t.length;++s){var a=e>>25;e=(33554431&e)<<5^t[s];for(var n=0;n<5;++n)a>>n&1&&(e^=i[n])}return e}function n(t){var e,s=[];for(e=0;e<t.length;++e)s.push(t.charCodeAt(e)>>5);for(s.push(0),e=0;e<t.length;++e)s.push(31&t.charCodeAt(e));return s}t.exports={decode:function(t){var e,i=!1,r=!1;for(e=0;e<t.length;++e){if(t.charCodeAt(e)<33||t.charCodeAt(e)>126)return null;t.charCodeAt(e)>=97&&t.charCodeAt(e)<=122&&(i=!0),t.charCodeAt(e)>=65&&t.charCodeAt(e)<=90&&(r=!0)}if(i&&r)return null;var l=(t=t.toLowerCase()).lastIndexOf("1");if(l<1||l+7>t.length||t.length>90)return null;var o=t.substring(0,l),c=[];for(e=l+1;e<t.length;++e){var _=s.indexOf(t.charAt(e));if(-1===_)return null;c.push(_)}if(!function(t,e){return 1===a(n(t).concat(e))}(o,c))return null;return{hrp:o,data:c.slice(0,c.length-6)}},encode:function(t,e){for(var i=e.concat(function(t,e){for(var s=1^a(n(t).concat(e).concat([0,0,0,0,0,0])),i=[],r=0;r<6;++r)i.push(s>>5*(5-r)&31);return i}(t,e)),r=t+"1",l=0;l<i.length;++l)r+=s.charAt(i[l]);return r}}},214:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tx-box"},[t.isList?s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"text-truncate"},[s("router-link",{attrs:{to:"/tx/"+t.tx.txid}},[t._v(t._s(t.tx.txid))])],1)])]):t._e(),t._v(" "),t.isList?s("hr"):t._e(),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-5"},[s("div",{staticClass:"text-center"},[t._v(t._s(t.$tc("tx.inputs",t.tx.isCoinBase?0:t.tx.vin.length,{count:t.tx.vin.length})))]),t._v(" "),t._l(t.vin.slice(0,t.vinShowAll?t.vin.length:5),function(e){return s("div",{staticClass:"panel-address"},[s("div",[e.addr===t.currentAddr?s("span",[t._v(t._s(e.addr))]):e.addr?s("router-link",{attrs:{to:"/address/"+e.addr}},[t._v(t._s(e.addr))]):t._e()],1),t._v(" "),t.tx.isCoinBase?s("div",[t._v(t._s(t.$t("tx.coinbase")))]):t._e(),t._v(" "),e.addr?s("div",{staticClass:"text-right"},[t._v(t._s(t.valueConvertion(e.value)))]):t._e()])}),t._v(" "),t.vin.length>5?s("div",{staticClass:"text-center toggle-button",on:{click:t.toggleVin}},[t.vinShowAll?t._e():s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_down")]),t._v(" "),t.vinShowAll?s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_up")]):t._e()]):t._e()],2),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"col-lg-5"},[s("div",{staticClass:"text-center"},[t._v(t._s(t.$tc("tx.outputs",t.tx.vout.length,{count:t.tx.vout.length})))]),t._v(" "),t._l(t.vout.slice(0,t.voutShowAll?t.vout.length:5),function(e){return s("div",[s("div",{staticClass:"panel-address"},[t._l(e.scriptPubKey.addresses,function(e){return s("div",{key:e},[e===t.currentAddr?s("span",[t._v(t._s(e))]):s("router-link",{attrs:{to:"/address/"+e}},[t._v(t._s(e))])],1)}),t._v(" "),e.scriptPubKey.message?s("div",[s("i",{staticClass:"material-icons align-middle"},[t._v("chat")]),s("span",[t._v(t._s(e.scriptPubKey.message))])]):t._e(),t._v(" "),e.scriptPubKey.message?t._e():s("div",{staticClass:"text-right"},[t._v(t._s(t.valueConvertion(e.value)))])],2)])}),t._v(" "),t.vout.length>5?s("div",{staticClass:"text-center toggle-button",on:{click:t.toggleVout}},[t.voutShowAll?t._e():s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_down")]),t._v(" "),t.voutShowAll?s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_up")]):t._e()]):t._e()],2)]),t._v(" "),t.isList?s("hr"):t._e(),t._v(" "),t.isList?s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[t.tx.fees?s("span",[t._v(t._s(t.$t("tx.fee"))+":"+t._s(t.valueConvertion(t.tx.fees)))]):t._e()]),t._v(" "),s("div",{staticClass:"col-6 text-right"},[s("span",[t._v(t._s(t.$t("tx.valueOut"))+":"+t._s(t.valueConvertion(t.tx.valueOut)))])])]):t._e()])};i._withStripped=!0;var a=s(2),n=s(199),r=s(205),l=s.n(r),o=s(197),c=s.n(o),_=s(207),u=s.n(_);var h=class{constructor(){}static sha256(t){return u()("sha256").update(t).digest()}static ripemd160(t){return u()("rmd160").update(t).digest()}static doubleSha256(t){return this.sha256(this.sha256(t))}static hash160(t){return this.ripemd160(this.sha256(t))}},v=s(209),d=s.n(v),O=s(155),P={data:()=>({vinShowAll:!1,voutShowAll:!1}),computed:{vin(){let t=this.tx.vin;return this.tx.isCoinBase||t.forEach((e,s)=>{if(e.value||0===e.value||(t[s].value="error"),!e.addr&&!e.scriptSig.hex)if(e.txinwitness){let i=new O.Buffer(e.txinwitness[e.txinwitness.length-1],"hex");i=33===i.length?h.hash160(i):h.sha256(i),t[s].addr=d.a.encode(a.a.bech32,0,i)}else t[s].addr="Unparsed address"}),t},vout(){let t=this.tx.vout;return t.forEach((e,s)=>{if(!e.scriptPubKey.addresses){let i=new O.Buffer(e.scriptPubKey.hex,"hex"),n=l.a.parseScript(i);3!==n.length||n[0]!=c.a._0||20!==n[2].length&&32!==n[1].length||(t[s].scriptPubKey.addresses=[d.a.encode(a.a.bech32,0,n[2])])}if(e.scriptPubKey&&"nulldata"===e.scriptPubKey.type){let i=this._decodeMessage(e.scriptPubKey.hex);i&&(t[s].scriptPubKey.message=this.tx.isCoinBase&&"aa21a9ed"===i.slice(0,8)?this.$t("tx.segwitCommitment"):i)}}),t}},methods:{_decodeMessage:function(t){let e=!1,s=new O.Buffer(t,"hex"),i=l.a.parseScript(s);if(i[0]==c.a._RETURN&&1<=i[1]&&i[1]<=78&&i[2]instanceof O.Buffer){let t=i[2].toString("hex"),s=new TextDecoder("utf-8").decode(i[2]);e=!s.includes(String.fromCharCode(65533))?s:t}return e},toggleVin:function(){this.vinShowAll=!this.vinShowAll},toggleVout:function(){this.voutShowAll=!this.voutShowAll},valueConvertion:t=>n.a.valueConvertion(t)},props:{tx:Object,isList:Boolean,currentAddr:String}},p=s(5),f=Object(p.a)(P,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-lg-2 text-center my-auto"},[e("div",{staticClass:"d-lg-none"},[e("i",{staticClass:"material-icons"},[this._v("keyboard_arrow_down")])]),this._v(" "),e("div",{staticClass:"d-none d-lg-block"},[e("i",{staticClass:"material-icons"},[this._v("keyboard_arrow_right")])])])}],!1,null,null,null);f.options.__file="src/component/transaction.vue";e.a=f.exports},218:function(t,e){},219:function(t,e){},342:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"mb-4 col-12"},[s("div",{staticClass:"title"},[t._v(t._s(t.$t("home.latestBlocks")))])]),t._v(" "),s("div",{staticClass:"mb-4 col-12 table-responsive"},[s("table",{staticClass:"table block-list-table"},[s("thead",[s("tr",[s("th",[t._v(t._s(t.$t("word.blockHeight")))]),s("th",[t._v(t._s(t.$t("word.age")))]),s("th",[t._v(t._s(t.$t("word.transactionCount")))]),s("th",{staticClass:"d-none d-lg-table-cell"},[t._v(t._s(t.$t("block.minedBy")))]),s("th",[t._v(t._s(t.$t("word.size")))])])]),t._v(" "),s("tbody",[t.blocks.length?t._e():s("tr",[s("td",{attrs:{colspan:"5"}},[t._v(t._s(t.$t("home.waitingBlock")))])]),t._v(" "),t._l(t.blocks,function(e,i){return s("tr",[s("td",[s("router-link",{attrs:{to:"/block/"+e.hash}},[t._v(t._s(e.height))])],1),t._v(" "),s("td",[t._v(t._s(t.age[i]))]),t._v(" "),s("td",[t._v(t._s(e.txlength))]),t._v(" "),s("td",{staticClass:"d-none d-lg-table-cell"},[e.poolInfo?s("a",{attrs:{href:e.poolInfo.url}},[t._v(t._s(e.poolInfo.poolName))]):t._e()]),t._v(" "),s("td",[t._v(t._s(e.size)+" byte")])])})],2)])]),t._v(" "),s("div",{staticClass:"mb-4 col-12"},[s("div",{staticClass:"title"},[t._v(t._s(t.$t("home.latestTxs")))])]),t._v(" "),s("div",{staticClass:"col-12"},[s("table",{staticClass:"table realtime-tx-table"},[s("thead",[s("tr",[s("th",{staticClass:"w-75"},[t._v(t._s(t.$t("word.transactionHash")))]),s("th",{staticClass:"w-25"},[t._v(t._s(t.$t("tx.value")))])])]),t._v(" "),s("tbody",[t.txs.length?t._e():s("tr",[s("td",{attrs:{colspan:"2"}},[t._v(t._s(t.$t("home.waitingTx")))])]),t._v(" "),t._l(t.txs,function(e){return s("tr",[s("td",[s("router-link",{attrs:{to:"/tx/"+e.txid}},[t._v(t._s(e.txid))])],1),t._v(" "),s("td",[t._v(t._s(t.valueConvertion(e.valueOut)))])])})],2)])])])};i._withStripped=!0;s(2);var a=s(214),n=s(11),r=s(8),l=s(199),o=s(0),c=s.n(o),_={data:()=>({blocks:[],txs:[],age:[],intervalID:-1}),methods:{onTx(t){this.txs.unshift(t),this.txs=this.txs.slice(0,5)},async onBlock(t){let e=await Object(r.a)(`/block/${t}`).catch(t=>!1);e&&(e.txlength=e.tx.length,this.blocks.unshift(e),this.blocks=this.blocks.slice(0,5),this.computeAge())},valueConvertion:t=>l.a.valueConvertion(t),computeAge(){this.age=this.blocks.map(t=>c()(t.time,"X").fromNow())}},async created(){n.a.$on("block",this.onBlock),n.a.$on("tx",this.onTx),this.$root.$on("changedLocale",this.computeAge),this.$root.setTitle("Home");let t=await Object(r.a)("/blocks?limit=5").catch(t=>!1);t&&(this.blocks=t.blocks.slice(0,5),this.computeAge(),this.intervalID=setInterval(this.computeAge,1e4))},beforeDestroy(){n.a.$off("block",this.onBlock),n.a.$off("tx",this.onTx),clearInterval(this.intervalID)},components:{transaction:a.a}},u=s(5),h=Object(u.a)(_,i,[],!1,null,null,null);h.options.__file="src/pages/home.vue";e.default=h.exports}}]);