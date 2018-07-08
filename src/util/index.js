import config from '../config';
export default {
  isHash(data){
    return /^([A-Fa-f0-9]{64})$/i.test(data);
  },
  addressType(address){
    let p2pkh = new RegExp(`^${config.p2pkh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`, '');
    let p2sh = new RegExp(`^${config.p2sh}[a-km-zA-HJ-NP-Z0-9]{26,33}$`, '');
    let bech32 = new RegExp(`^${config.bech32}1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,59}$`, 'i');
    
    if(p2pkh.test(address))
      return "P2PKH";
    if(p2sh.test(address))
      return "P2SH";
    if(bech32.test(address))
      return "BECH32";
      
    return false;
  }
}
