const OP = require("./opcode");

class Script{
  constructor(){
  
  }
  
  static parseScript(buffer, stringMode){
    let stack = [];
    let i = 0;
  
    do {
      let v = buffer.readUInt8(i);
      i += 1;
      
      v = new OP(v);
      const op = v.toString();
      
      if( op === "UNKNOWN" )
        continue;
        
      stack.push(v);
      
      if( op === "OP_PUSHDATA" ){
        stack.push(buffer.slice(i, i + v));
        i += v;
      }
        
      if( op === "OP_PUSHDATA1" ){
        let len = buffer.readUInt8(i);
        i += 1;
        stack.push(buffer.slice(i, i + len));
        i += len;
      }
      if( op=== "OP_PUSHDATA2" ){
        let len = buffer.readUInt16LE(i);
        i += 2;
        stack.push(buffer.slice(i, i + len));
        i += len;
      }
      if( op === "OP_PUSHDATA4" ){
        let len = buffer.readUInt32LE(i);
        i += 4;
        stack.push(buffer.slice(i, i + len));
        i += len;
      }
    }while(buffer.length > i);

    return stack;
  }
}
module.exports = Script;
