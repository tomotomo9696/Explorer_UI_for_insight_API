(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{216:function(e,r,n){var t;!function(i){"use strict";var o,s=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,u=Math.ceil,f=Math.floor,c="[BigNumber Error] ",l=c+"Number primitive has more than 15 significant digits: ",a=1e14,h=14,p=9007199254740991,g=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],w=1e7,d=1e9;function m(e){var r=0|e;return e>0||e===r?r:r-1}function v(e){for(var r,n,t=1,i=e.length,o=e[0]+"";t<i;){for(r=e[t++]+"",n=h-r.length;n--;r="0"+r);o+=r}for(i=o.length;48===o.charCodeAt(--i););return o.slice(0,i+1||1)}function O(e,r){var n,t,i=e.c,o=r.c,s=e.s,u=r.s,f=e.e,c=r.e;if(!s||!u)return null;if(n=i&&!i[0],t=o&&!o[0],n||t)return n?t?0:-u:s;if(s!=u)return s;if(n=s<0,t=f==c,!i||!o)return t?0:!i^n?1:-1;if(!t)return f>c^n?1:-1;for(u=(f=i.length)<(c=o.length)?f:c,s=0;s<u;s++)if(i[s]!=o[s])return i[s]>o[s]^n?1:-1;return f==c?0:f>c^n?1:-1}function N(e,r,n,t){if(e<r||e>n||e!==(e<0?u(e):f(e)))throw Error(c+(t||"Argument")+("number"==typeof e?e<r||e>n?" out of range: ":" not an integer: ":" not a primitive number: ")+e)}function y(e){return"[object Array]"==Object.prototype.toString.call(e)}function E(e){var r=e.c.length-1;return m(e.e/h)==r&&e.c[r]%2!=0}function b(e,r){return(e.length>1?e.charAt(0)+"."+e.slice(1):e)+(r<0?"e":"e+")+r}function A(e,r,n){var t,i;if(r<0){for(i=n+".";++r;i+=n);e=i+e}else if(++r>(t=e.length)){for(i=n,r-=t;--r;i+=n);e+=i}else r<t&&(e=e.slice(0,r)+"."+e.slice(r));return e}(o=function e(r){var n,t,i,o=M.prototype={constructor:M,toString:null,valueOf:null},R=new M(1),S=20,P=4,_=-7,D=21,L=-1e7,U=1e7,B=!1,I=1,T=0,C={decimalSeparator:".",groupSeparator:",",groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:" ",fractionGroupSize:0},x="0123456789abcdefghijklmnopqrstuvwxyz";function M(e,r){var n,o,u,c,a,g,w,d,m=this;if(!(m instanceof M))return new M(e,r);if(null==r){if(e instanceof M)return m.s=e.s,m.e=e.e,void(m.c=(e=e.c)?e.slice():e);if((g="number"==typeof e)&&0*e==0){if(m.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,a=e;a>=10;a/=10,c++);return m.e=c,void(m.c=[e])}d=e+""}else{if(!s.test(d=e+""))return i(m,d,g);m.s=45==d.charCodeAt(0)?(d=d.slice(1),-1):1}(c=d.indexOf("."))>-1&&(d=d.replace(".","")),(a=d.search(/e/i))>0?(c<0&&(c=a),c+=+d.slice(a+1),d=d.substring(0,a)):c<0&&(c=d.length)}else{if(N(r,2,x.length,"Base"),d=e+"",10==r)return q(m=new M(e instanceof M?e:d),S+m.e+1,P);if(g="number"==typeof e){if(0*e!=0)return i(m,d,g,r);if(m.s=1/e<0?(d=d.slice(1),-1):1,M.DEBUG&&d.replace(/^0\.0*|\./,"").length>15)throw Error(l+e);g=!1}else m.s=45===d.charCodeAt(0)?(d=d.slice(1),-1):1;for(n=x.slice(0,r),c=a=0,w=d.length;a<w;a++)if(n.indexOf(o=d.charAt(a))<0){if("."==o){if(a>c){c=w;continue}}else if(!u&&(d==d.toUpperCase()&&(d=d.toLowerCase())||d==d.toLowerCase()&&(d=d.toUpperCase()))){u=!0,a=-1,c=0;continue}return i(m,e+"",g,r)}(c=(d=t(d,r,10,m.s)).indexOf("."))>-1?d=d.replace(".",""):c=d.length}for(a=0;48===d.charCodeAt(a);a++);for(w=d.length;48===d.charCodeAt(--w););if(d=d.slice(a,++w)){if(w-=a,g&&M.DEBUG&&w>15&&(e>p||e!==f(e)))throw Error(l+m.s*e);if((c=c-a-1)>U)m.c=m.e=null;else if(c<L)m.c=[m.e=0];else{if(m.e=c,m.c=[],a=(c+1)%h,c<0&&(a+=h),a<w){for(a&&m.c.push(+d.slice(0,a)),w-=h;a<w;)m.c.push(+d.slice(a,a+=h));d=d.slice(a),a=h-d.length}else a-=w;for(;a--;d+="0");m.c.push(+d)}}else m.c=[m.e=0]}function G(e,r,n,t){var i,o,s,u,f;if(null==n?n=P:N(n,0,8),!e.c)return e.toString();if(i=e.c[0],s=e.e,null==r)f=v(e.c),f=1==t||2==t&&s<=_?b(f,s):A(f,s,"0");else if(o=(e=q(new M(e),r,n)).e,u=(f=v(e.c)).length,1==t||2==t&&(r<=o||o<=_)){for(;u<r;f+="0",u++);f=b(f,o)}else if(r-=s,f=A(f,o,"0"),o+1>u){if(--r>0)for(f+=".";r--;f+="0");}else if((r+=o-u)>0)for(o+1==u&&(f+=".");r--;f+="0");return e.s<0&&i?"-"+f:f}function k(e,r){var n,t,i=0;for(y(e[0])&&(e=e[0]),n=new M(e[0]);++i<e.length;){if(!(t=new M(e[i])).s){n=t;break}r.call(n,t)&&(n=t)}return n}function F(e,r,n){for(var t=1,i=r.length;!r[--i];r.pop());for(i=r[0];i>=10;i/=10,t++);return(n=t+n*h-1)>U?e.c=e.e=null:n<L?e.c=[e.e=0]:(e.e=n,e.c=r),e}function q(e,r,n,t){var i,o,s,c,l,p,w,d=e.c,m=g;if(d){e:{for(i=1,c=d[0];c>=10;c/=10,i++);if((o=r-i)<0)o+=h,s=r,w=(l=d[p=0])/m[i-s-1]%10|0;else if((p=u((o+1)/h))>=d.length){if(!t)break e;for(;d.length<=p;d.push(0));l=w=0,i=1,s=(o%=h)-h+1}else{for(l=c=d[p],i=1;c>=10;c/=10,i++);w=(s=(o%=h)-h+i)<0?0:l/m[i-s-1]%10|0}if(t=t||r<0||null!=d[p+1]||(s<0?l:l%m[i-s-1]),t=n<4?(w||t)&&(0==n||n==(e.s<0?3:2)):w>5||5==w&&(4==n||t||6==n&&(o>0?s>0?l/m[i-s]:0:d[p-1])%10&1||n==(e.s<0?8:7)),r<1||!d[0])return d.length=0,t?(r-=e.e+1,d[0]=m[(h-r%h)%h],e.e=-r||0):d[0]=e.e=0,e;if(0==o?(d.length=p,c=1,p--):(d.length=p+1,c=m[h-o],d[p]=s>0?f(l/m[i-s]%m[s])*c:0),t)for(;;){if(0==p){for(o=1,s=d[0];s>=10;s/=10,o++);for(s=d[0]+=c,c=1;s>=10;s/=10,c++);o!=c&&(e.e++,d[0]==a&&(d[0]=1));break}if(d[p]+=c,d[p]!=a)break;d[p--]=0,c=1}for(o=d.length;0===d[--o];d.pop());}e.e>U?e.c=e.e=null:e.e<L&&(e.c=[e.e=0])}return e}return M.clone=e,M.ROUND_UP=0,M.ROUND_DOWN=1,M.ROUND_CEIL=2,M.ROUND_FLOOR=3,M.ROUND_HALF_UP=4,M.ROUND_HALF_DOWN=5,M.ROUND_HALF_EVEN=6,M.ROUND_HALF_CEIL=7,M.ROUND_HALF_FLOOR=8,M.EUCLID=9,M.config=M.set=function(e){var r,n;if(null!=e){if("object"!=typeof e)throw Error(c+"Object expected: "+e);if(e.hasOwnProperty(r="DECIMAL_PLACES")&&(N(n=e[r],0,d,r),S=n),e.hasOwnProperty(r="ROUNDING_MODE")&&(N(n=e[r],0,8,r),P=n),e.hasOwnProperty(r="EXPONENTIAL_AT")&&(y(n=e[r])?(N(n[0],-d,0,r),N(n[1],0,d,r),_=n[0],D=n[1]):(N(n,-d,d,r),_=-(D=n<0?-n:n))),e.hasOwnProperty(r="RANGE"))if(y(n=e[r]))N(n[0],-d,-1,r),N(n[1],1,d,r),L=n[0],U=n[1];else{if(N(n,-d,d,r),!n)throw Error(c+r+" cannot be zero: "+n);L=-(U=n<0?-n:n)}if(e.hasOwnProperty(r="CRYPTO")){if((n=e[r])!==!!n)throw Error(c+r+" not true or false: "+n);if(n){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw B=!n,Error(c+"crypto unavailable");B=n}else B=n}if(e.hasOwnProperty(r="MODULO_MODE")&&(N(n=e[r],0,9,r),I=n),e.hasOwnProperty(r="POW_PRECISION")&&(N(n=e[r],0,d,r),T=n),e.hasOwnProperty(r="FORMAT")){if("object"!=typeof(n=e[r]))throw Error(c+r+" not an object: "+n);C=n}if(e.hasOwnProperty(r="ALPHABET")){if("string"!=typeof(n=e[r])||/^.$|\.|(.).*\1/.test(n))throw Error(c+r+" invalid: "+n);x=n}}return{DECIMAL_PLACES:S,ROUNDING_MODE:P,EXPONENTIAL_AT:[_,D],RANGE:[L,U],CRYPTO:B,MODULO_MODE:I,POW_PRECISION:T,FORMAT:C,ALPHABET:x}},M.isBigNumber=function(e){return e instanceof M||e&&!0===e._isBigNumber||!1},M.maximum=M.max=function(){return k(arguments,o.lt)},M.minimum=M.min=function(){return k(arguments,o.gt)},M.random=function(){var e=9007199254740992*Math.random()&2097151?function(){return f(9007199254740992*Math.random())}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)};return function(r){var n,t,i,o,s,l=0,a=[],p=new M(R);if(null==r?r=S:N(r,0,d),o=u(r/h),B)if(crypto.getRandomValues){for(n=crypto.getRandomValues(new Uint32Array(o*=2));l<o;)(s=131072*n[l]+(n[l+1]>>>11))>=9e15?(t=crypto.getRandomValues(new Uint32Array(2)),n[l]=t[0],n[l+1]=t[1]):(a.push(s%1e14),l+=2);l=o/2}else{if(!crypto.randomBytes)throw B=!1,Error(c+"crypto unavailable");for(n=crypto.randomBytes(o*=7);l<o;)(s=281474976710656*(31&n[l])+1099511627776*n[l+1]+4294967296*n[l+2]+16777216*n[l+3]+(n[l+4]<<16)+(n[l+5]<<8)+n[l+6])>=9e15?crypto.randomBytes(7).copy(n,l):(a.push(s%1e14),l+=7);l=o/7}if(!B)for(;l<o;)(s=e())<9e15&&(a[l++]=s%1e14);for(o=a[--l],r%=h,o&&r&&(s=g[h-r],a[l]=f(o/s)*s);0===a[l];a.pop(),l--);if(l<0)a=[i=0];else{for(i=-1;0===a[0];a.splice(0,1),i-=h);for(l=1,s=a[0];s>=10;s/=10,l++);l<h&&(i-=h-l)}return p.e=i,p.c=a,p}}(),t=function(){function e(e,r,n,t){for(var i,o,s=[0],u=0,f=e.length;u<f;){for(o=s.length;o--;s[o]*=r);for(s[0]+=t.indexOf(e.charAt(u++)),i=0;i<s.length;i++)s[i]>n-1&&(null==s[i+1]&&(s[i+1]=0),s[i+1]+=s[i]/n|0,s[i]%=n)}return s.reverse()}return function(r,t,i,o,s){var u,f,c,l,a,h,p,g,w=r.indexOf("."),d=S,m=P;for(w>=0&&(l=T,T=0,r=r.replace(".",""),h=(g=new M(t)).pow(r.length-w),T=l,g.c=e(A(v(h.c),h.e,"0"),10,i,"0123456789"),g.e=g.c.length),c=l=(p=e(r,t,i,s?(u=x,"0123456789"):(u="0123456789",x))).length;0==p[--l];p.pop());if(!p[0])return u.charAt(0);if(w<0?--c:(h.c=p,h.e=c,h.s=o,p=(h=n(h,g,d,m,i)).c,a=h.r,c=h.e),w=p[f=c+d+1],l=i/2,a=a||f<0||null!=p[f+1],a=m<4?(null!=w||a)&&(0==m||m==(h.s<0?3:2)):w>l||w==l&&(4==m||a||6==m&&1&p[f-1]||m==(h.s<0?8:7)),f<1||!p[0])r=a?A(u.charAt(1),-d,u.charAt(0)):u.charAt(0);else{if(p.length=f,a)for(--i;++p[--f]>i;)p[f]=0,f||(++c,p=[1].concat(p));for(l=p.length;!p[--l];);for(w=0,r="";w<=l;r+=u.charAt(p[w++]));r=A(r,c,u.charAt(0))}return r}}(),n=function(){function e(e,r,n){var t,i,o,s,u=0,f=e.length,c=r%w,l=r/w|0;for(e=e.slice();f--;)u=((i=c*(o=e[f]%w)+(t=l*o+(s=e[f]/w|0)*c)%w*w+u)/n|0)+(t/w|0)+l*s,e[f]=i%n;return u&&(e=[u].concat(e)),e}function r(e,r,n,t){var i,o;if(n!=t)o=n>t?1:-1;else for(i=o=0;i<n;i++)if(e[i]!=r[i]){o=e[i]>r[i]?1:-1;break}return o}function n(e,r,n,t){for(var i=0;n--;)e[n]-=i,i=e[n]<r[n]?1:0,e[n]=i*t+e[n]-r[n];for(;!e[0]&&e.length>1;e.splice(0,1));}return function(t,i,o,s,u){var c,l,p,g,w,d,v,O,N,y,E,b,A,R,S,P,_,D=t.s==i.s?1:-1,L=t.c,U=i.c;if(!(L&&L[0]&&U&&U[0]))return new M(t.s&&i.s&&(L?!U||L[0]!=U[0]:U)?L&&0==L[0]||!U?0*D:D/0:NaN);for(N=(O=new M(D)).c=[],D=o+(l=t.e-i.e)+1,u||(u=a,l=m(t.e/h)-m(i.e/h),D=D/h|0),p=0;U[p]==(L[p]||0);p++);if(U[p]>(L[p]||0)&&l--,D<0)N.push(1),g=!0;else{for(R=L.length,P=U.length,p=0,D+=2,(w=f(u/(U[0]+1)))>1&&(U=e(U,w,u),L=e(L,w,u),P=U.length,R=L.length),A=P,E=(y=L.slice(0,P)).length;E<P;y[E++]=0);_=U.slice(),_=[0].concat(_),S=U[0],U[1]>=u/2&&S++;do{if(w=0,(c=r(U,y,P,E))<0){if(b=y[0],P!=E&&(b=b*u+(y[1]||0)),(w=f(b/S))>1)for(w>=u&&(w=u-1),v=(d=e(U,w,u)).length,E=y.length;1==r(d,y,v,E);)w--,n(d,P<v?_:U,v,u),v=d.length,c=1;else 0==w&&(c=w=1),v=(d=U.slice()).length;if(v<E&&(d=[0].concat(d)),n(y,d,E,u),E=y.length,-1==c)for(;r(U,y,P,E)<1;)w++,n(y,P<E?_:U,E,u),E=y.length}else 0===c&&(w++,y=[0]);N[p++]=w,y[0]?y[E++]=L[A]||0:(y=[L[A]],E=1)}while((A++<R||null!=y[0])&&D--);g=null!=y[0],N[0]||N.splice(0,1)}if(u==a){for(p=1,D=N[0];D>=10;D/=10,p++);q(O,o+(O.e=p+l*h-1)+1,s,g)}else O.e=l,O.r=+g;return O}}(),i=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,r=/^([^.]+)\.$/,n=/^\.([^.]+)$/,t=/^-?(Infinity|NaN)$/,i=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(o,s,u,f){var l,a=u?s:s.replace(i,"");if(t.test(a))o.s=isNaN(a)?null:a<0?-1:1,o.c=o.e=null;else{if(!u&&(a=a.replace(e,function(e,r,n){return l="x"==(n=n.toLowerCase())?16:"b"==n?2:8,f&&f!=l?e:r}),f&&(l=f,a=a.replace(r,"$1").replace(n,"0.$1")),s!=a))return new M(a,l);if(M.DEBUG)throw Error(c+"Not a"+(f?" base "+f:"")+" number: "+s);o.c=o.e=o.s=null}}}(),o.absoluteValue=o.abs=function(){var e=new M(this);return e.s<0&&(e.s=1),e},o.comparedTo=function(e,r){return O(this,new M(e,r))},o.decimalPlaces=o.dp=function(e,r){var n,t,i,o=this;if(null!=e)return N(e,0,d),null==r?r=P:N(r,0,8),q(new M(o),e+o.e+1,r);if(!(n=o.c))return null;if(t=((i=n.length-1)-m(this.e/h))*h,i=n[i])for(;i%10==0;i/=10,t--);return t<0&&(t=0),t},o.dividedBy=o.div=function(e,r){return n(this,new M(e,r),S,P)},o.dividedToIntegerBy=o.idiv=function(e,r){return n(this,new M(e,r),0,1)},o.exponentiatedBy=o.pow=function(e,r){var n,t,i,o,s,l,a,p=this;if((e=new M(e)).c&&!e.isInteger())throw Error(c+"Exponent not an integer: "+e);if(null!=r&&(r=new M(r)),o=e.e>14,!p.c||!p.c[0]||1==p.c[0]&&!p.e&&1==p.c.length||!e.c||!e.c[0])return a=new M(Math.pow(+p.valueOf(),o?2-E(e):+e)),r?a.mod(r):a;if(s=e.s<0,r){if(r.c?!r.c[0]:!r.s)return new M(NaN);(t=!s&&p.isInteger()&&r.isInteger())&&(p=p.mod(r))}else{if(e.e>9&&(p.e>0||p.e<-1||(0==p.e?p.c[0]>1||o&&p.c[1]>=24e7:p.c[0]<8e13||o&&p.c[0]<=9999975e7)))return i=p.s<0&&E(e)?-0:0,p.e>-1&&(i=1/i),new M(s?1/i:i);T&&(i=u(T/h+2))}for(o?(n=new M(.5),l=E(e)):l=e%2,s&&(e.s=1),a=new M(R);;){if(l){if(!(a=a.times(p)).c)break;i?a.c.length>i&&(a.c.length=i):t&&(a=a.mod(r))}if(o){if(q(e=e.times(n),e.e+1,1),!e.c[0])break;o=e.e>14,l=E(e)}else{if(!(e=f(e/2)))break;l=e%2}p=p.times(p),i?p.c&&p.c.length>i&&(p.c.length=i):t&&(p=p.mod(r))}return t?a:(s&&(a=R.div(a)),r?a.mod(r):i?q(a,T,P,void 0):a)},o.integerValue=function(e){var r=new M(this);return null==e?e=P:N(e,0,8),q(r,r.e+1,e)},o.isEqualTo=o.eq=function(e,r){return 0===O(this,new M(e,r))},o.isFinite=function(){return!!this.c},o.isGreaterThan=o.gt=function(e,r){return O(this,new M(e,r))>0},o.isGreaterThanOrEqualTo=o.gte=function(e,r){return 1===(r=O(this,new M(e,r)))||0===r},o.isInteger=function(){return!!this.c&&m(this.e/h)>this.c.length-2},o.isLessThan=o.lt=function(e,r){return O(this,new M(e,r))<0},o.isLessThanOrEqualTo=o.lte=function(e,r){return-1===(r=O(this,new M(e,r)))||0===r},o.isNaN=function(){return!this.s},o.isNegative=function(){return this.s<0},o.isPositive=function(){return this.s>0},o.isZero=function(){return!!this.c&&0==this.c[0]},o.minus=function(e,r){var n,t,i,o,s=this,u=s.s;if(r=(e=new M(e,r)).s,!u||!r)return new M(NaN);if(u!=r)return e.s=-r,s.plus(e);var f=s.e/h,c=e.e/h,l=s.c,p=e.c;if(!f||!c){if(!l||!p)return l?(e.s=-r,e):new M(p?s:NaN);if(!l[0]||!p[0])return p[0]?(e.s=-r,e):new M(l[0]?s:3==P?-0:0)}if(f=m(f),c=m(c),l=l.slice(),u=f-c){for((o=u<0)?(u=-u,i=l):(c=f,i=p),i.reverse(),r=u;r--;i.push(0));i.reverse()}else for(t=(o=(u=l.length)<(r=p.length))?u:r,u=r=0;r<t;r++)if(l[r]!=p[r]){o=l[r]<p[r];break}if(o&&(i=l,l=p,p=i,e.s=-e.s),(r=(t=p.length)-(n=l.length))>0)for(;r--;l[n++]=0);for(r=a-1;t>u;){if(l[--t]<p[t]){for(n=t;n&&!l[--n];l[n]=r);--l[n],l[t]+=a}l[t]-=p[t]}for(;0==l[0];l.splice(0,1),--c);return l[0]?F(e,l,c):(e.s=3==P?-1:1,e.c=[e.e=0],e)},o.modulo=o.mod=function(e,r){var t,i,o=this;return e=new M(e,r),!o.c||!e.s||e.c&&!e.c[0]?new M(NaN):!e.c||o.c&&!o.c[0]?new M(o):(9==I?(i=e.s,e.s=1,t=n(o,e,0,3),e.s=i,t.s*=i):t=n(o,e,0,I),(e=o.minus(t.times(e))).c[0]||1!=I||(e.s=o.s),e)},o.multipliedBy=o.times=function(e,r){var n,t,i,o,s,u,f,c,l,p,g,d,v,O,N,y=this,E=y.c,b=(e=new M(e,r)).c;if(!(E&&b&&E[0]&&b[0]))return!y.s||!e.s||E&&!E[0]&&!b||b&&!b[0]&&!E?e.c=e.e=e.s=null:(e.s*=y.s,E&&b?(e.c=[0],e.e=0):e.c=e.e=null),e;for(t=m(y.e/h)+m(e.e/h),e.s*=y.s,(f=E.length)<(p=b.length)&&(v=E,E=b,b=v,i=f,f=p,p=i),i=f+p,v=[];i--;v.push(0));for(O=a,N=w,i=p;--i>=0;){for(n=0,g=b[i]%N,d=b[i]/N|0,o=i+(s=f);o>i;)n=((c=g*(c=E[--s]%N)+(u=d*c+(l=E[s]/N|0)*g)%N*N+v[o]+n)/O|0)+(u/N|0)+d*l,v[o--]=c%O;v[o]=n}return n?++t:v.splice(0,1),F(e,v,t)},o.negated=function(){var e=new M(this);return e.s=-e.s||null,e},o.plus=function(e,r){var n,t=this,i=t.s;if(r=(e=new M(e,r)).s,!i||!r)return new M(NaN);if(i!=r)return e.s=-r,t.minus(e);var o=t.e/h,s=e.e/h,u=t.c,f=e.c;if(!o||!s){if(!u||!f)return new M(i/0);if(!u[0]||!f[0])return f[0]?e:new M(u[0]?t:0*i)}if(o=m(o),s=m(s),u=u.slice(),i=o-s){for(i>0?(s=o,n=f):(i=-i,n=u),n.reverse();i--;n.push(0));n.reverse()}for((i=u.length)-(r=f.length)<0&&(n=f,f=u,u=n,r=i),i=0;r;)i=(u[--r]=u[r]+f[r]+i)/a|0,u[r]=a===u[r]?0:u[r]%a;return i&&(u=[i].concat(u),++s),F(e,u,s)},o.precision=o.sd=function(e,r){var n,t,i,o=this;if(null!=e&&e!==!!e)return N(e,1,d),null==r?r=P:N(r,0,8),q(new M(o),e,r);if(!(n=o.c))return null;if(t=(i=n.length-1)*h+1,i=n[i]){for(;i%10==0;i/=10,t--);for(i=n[0];i>=10;i/=10,t++);}return e&&o.e+1>t&&(t=o.e+1),t},o.shiftedBy=function(e){return N(e,-p,p),this.times("1e"+e)},o.squareRoot=o.sqrt=function(){var e,r,t,i,o,s=this,u=s.c,f=s.s,c=s.e,l=S+4,a=new M("0.5");if(1!==f||!u||!u[0])return new M(!f||f<0&&(!u||u[0])?NaN:u?s:1/0);if(0==(f=Math.sqrt(+s))||f==1/0?(((r=v(u)).length+c)%2==0&&(r+="0"),f=Math.sqrt(r),c=m((c+1)/2)-(c<0||c%2),t=new M(r=f==1/0?"1e"+c:(r=f.toExponential()).slice(0,r.indexOf("e")+1)+c)):t=new M(f+""),t.c[0])for((f=(c=t.e)+l)<3&&(f=0);;)if(o=t,t=a.times(o.plus(n(s,o,l,1))),v(o.c).slice(0,f)===(r=v(t.c)).slice(0,f)){if(t.e<c&&--f,"9999"!=(r=r.slice(f-3,f+1))&&(i||"4999"!=r)){+r&&(+r.slice(1)||"5"!=r.charAt(0))||(q(t,t.e+S+2,1),e=!t.times(t).eq(s));break}if(!i&&(q(o,o.e+S+2,0),o.times(o).eq(s))){t=o;break}l+=4,f+=4,i=1}return q(t,t.e+S+1,P,e)},o.toExponential=function(e,r){return null!=e&&(N(e,0,d),e++),G(this,e,r,1)},o.toFixed=function(e,r){return null!=e&&(N(e,0,d),e=e+this.e+1),G(this,e,r)},o.toFormat=function(e,r){var n=this.toFixed(e,r);if(this.c){var t,i=n.split("."),o=+C.groupSize,s=+C.secondaryGroupSize,u=C.groupSeparator,f=i[0],c=i[1],l=this.s<0,a=l?f.slice(1):f,h=a.length;if(s&&(t=o,o=s,s=t,h-=t),o>0&&h>0){for(t=h%o||o,f=a.substr(0,t);t<h;t+=o)f+=u+a.substr(t,o);s>0&&(f+=u+a.slice(t)),l&&(f="-"+f)}n=c?f+C.decimalSeparator+((s=+C.fractionGroupSize)?c.replace(new RegExp("\\d{"+s+"}\\B","g"),"$&"+C.fractionGroupSeparator):c):f}return n},o.toFraction=function(e){var r,t,i,o,s,u,f,l,a,p,w,d,m=this,O=m.c;if(null!=e&&(!(l=new M(e)).isInteger()&&(l.c||1!==l.s)||l.lt(R)))throw Error(c+"Argument "+(l.isInteger()?"out of range: ":"not an integer: ")+e);if(!O)return m.toString();for(t=new M(R),p=i=new M(R),o=a=new M(R),d=v(O),u=t.e=d.length-m.e-1,t.c[0]=g[(f=u%h)<0?h+f:f],e=!e||l.comparedTo(t)>0?u>0?t:p:l,f=U,U=1/0,l=new M(d),a.c[0]=0;w=n(l,t,0,1),1!=(s=i.plus(w.times(o))).comparedTo(e);)i=o,o=s,p=a.plus(w.times(s=p)),a=s,t=l.minus(w.times(s=t)),l=s;return s=n(e.minus(i),o,0,1),a=a.plus(s.times(p)),i=i.plus(s.times(o)),a.s=p.s=m.s,r=n(p,o,u*=2,P).minus(m).abs().comparedTo(n(a,i,u,P).minus(m).abs())<1?[p.toString(),o.toString()]:[a.toString(),i.toString()],U=f,r},o.toNumber=function(){return+this},o.toPrecision=function(e,r){return null!=e&&N(e,1,d),G(this,e,r,2)},o.toString=function(e){var r,n=this,i=n.s,o=n.e;return null===o?i?(r="Infinity",i<0&&(r="-"+r)):r="NaN":(r=v(n.c),null==e?r=o<=_||o>=D?b(r,o):A(r,o,"0"):(N(e,2,x.length,"Base"),r=t(A(r,o,"0"),10,e,i,!0)),i<0&&n.c[0]&&(r="-"+r)),r},o.valueOf=o.toJSON=function(){var e,r=this,n=r.e;return null===n?r.toString():(e=v(r.c),e=n<=_||n>=D?b(e,n):A(e,n,"0"),r.s<0?"-"+e:e)},o._isBigNumber=!0,null!=r&&M.set(r),M}()).default=o.BigNumber=o,void 0===(t=function(){return o}.call(r,n,r,e))||(e.exports=t)}()}}]);