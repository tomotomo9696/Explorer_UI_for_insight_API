import CONFIG from "../config";
import BigNumber from "bignumber.js";
import qs from "qs";

export default {
  isHash(data){
    return /^([A-Fa-f0-9]{64})$/i.test(data);
  },
  addressType(address){
    let p2pkh = new RegExp(`^${CONFIG.p2pkh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`, '');
    let p2sh = new RegExp(`^${CONFIG.p2sh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`, '');
    let bech32 = new RegExp(`^${CONFIG.bech32}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,59}$`, 'i');
    
    if(p2pkh.test(address))
      return "P2PKH";
    if(p2sh.test(address))
      return "P2SH";
    if(bech32.test(address))
      return "BECH32";
      
    return false;
  },
  parseBitcoinUri(uri){
    const scheme = CONFIG.scheme || "bitcoin";
    if(uri.indexOf(scheme) !== 0 || uri.charAt(scheme.length) !== ":")
      return false;
      
    const g = /[^:]*:\/?\/?([^?]*)/.exec(uri);
    const address = g && g[1];
    if(!this.addressType(address))
      return false;
    
    const query = uri.split("?")[1] || "";
    const params = qs.parse(query);

    return { address: address, params: params };
  },
  valueConvertion(value) {
    return new BigNumber(value).toString(10) + ` ${CONFIG.currencySymbol}`;
  }
}
