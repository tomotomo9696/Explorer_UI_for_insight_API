import createHash from "create-hash";

class Hash{
  constructor(){
  }
  
  static sha256(data){
    return createHash('sha256').update(data).digest();
  }
  
  static ripemd160(data){
    return createHash('rmd160').update(data).digest();
  }
  
  static doubleSha256(data){
    return this.sha256(this.sha256(data));
  }
  
  static hash160(data){
    return this.ripemd160(this.sha256(data));
  }
}

export default Hash;
