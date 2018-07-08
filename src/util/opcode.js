"use strict";
const CODELIST = {
  //constant
  OP_0                  : 0x00,

  OP_PUSHDATA1          : 0x4c,
  OP_PUSHDATA2          : 0x4d,
  OP_PUSHDATA4          : 0x4e,

  OP_1NEGATE            : 0x4f,
  OP_1                  : 0x51,

  OP_2                  : 0x52,
  OP_3                  : 0x53,
  OP_4                  : 0x54,
  OP_5                  : 0x55,
  OP_6                  : 0x56,
  OP_7                  : 0x57,
  OP_8                  : 0x58,
  OP_9                  : 0x59,
  OP_10                 : 0x5a,
  OP_11                 : 0x5b,
  OP_12                 : 0x5c,
  OP_13                 : 0x5d,
  OP_14                 : 0x5e,
  OP_15                 : 0x5f,
  OP_16                 : 0x60,
  
  //control
  OP_NOP                : 0x61,
  OP_IF                 : 0x63,
  OP_NOTIF              : 0x64,
  OP_ELSE               : 0x67,
  OP_ENDIF              : 0x68,
  OP_VERIFY             : 0x69,
  OP_RETURN             : 0x6a,
  
  //stack
  OP_TOALTSTACK         : 0x6b,
  OP_FROMALTSTACK       : 0x6c,
  OP_2DROP              : 0x6d,
  OP_2DUP               : 0x6e,
  OP_3DUP               : 0x6f,
  OP_2OVER              : 0x70,
  OP_2ROT               : 0x71,
  OP_2SWAP              : 0x72,
  
  OP_IFDUP              : 0x73,
  OP_DEPTH              : 0x74,
  OP_DROP               : 0x75,
  OP_DUP                : 0x76,
  OP_NIP                : 0x77,
  OP_OVER               : 0x78,
  OP_PICK               : 0x79,
  OP_ROLL               : 0x7a,
  OP_ROT                : 0x7b,
  OP_SWAP               : 0x7c,
  OP_TUCK               : 0x7d,
  
  //Splice  
  //OP_CAT                : 0x7e, disabled
  //OP_SUBSTR             : 0x7f, disabled
  //OP_LEFT               : 0x80, disabled
  //OP_RIGHT              : 0x81, disabled
  OP_SIZE               : 0x82,
  
  //logic  
  //OP_INVERT             : 0x83, disabled
  //OP_AND                : 0x84, disabled
  //OP_OR                 : 0x85, disabled
  //OP_XOR                : 0x86, disabled


  //arithmetic
  OP_EQUAL              : 0x87,
  OP_EQUALVERIFY        : 0x88,
  OP_1ADD               : 0x8b,
  OP_1SUB               : 0x8c,
  //OP_2MUL               : 0x8d, disabled
  //OP_2DIV               : 0x8e, disabled
  OP_NEGATE             : 0x8f,
  OP_ABS                : 0x90,
  OP_NOT                : 0x91,
  OP_0NOTEQUAL          : 0x92,
  OP_ADD                : 0x93,
  OP_SUB                : 0x94,
  //OP_MUL                : 0x95, disabled
  //OP_DIV                : 0x96, disabled
  //OP_MOD                : 0x97, disabled
  //OP_LSHIFT             : 0x98, disabled
  //OP_RSHIFT             : 0x99, disabled
  OP_BOOLAND            : 0x9a,
  OP_BOOLOR             : 0x9b,
  OP_NUMEQUAL           : 0x9c,
  OP_NUMEQUALVERIFY     : 0x9d,
  OP_NUMNOTEQUAL        : 0x9e,
  OP_LESSTHAN           : 0x9f,
  OP_GREATERTHAN        : 0xa0,
  OP_LESSTHANOREQUAL    : 0xa1,
  OP_GREATERTHANOREQUAL : 0xa2,
  OP_MIN                : 0xa3,
  OP_MAX                : 0xa4,
  OP_WITHIN             : 0xa5,
  
  
  //crypto
  OP_RIPEMD160          : 0xa6,
  OP_SHA1               : 0xa7,
  OP_SHA256             : 0xa8,
  OP_HASH160            : 0xa9,
  OP_HASH256            : 0xaa,
  OP_CODESEPARATOR      : 0xab,
  OP_CHECKSIG           : 0xac,
  OP_CHECKSIGVERIFY     : 0xad,
  OP_CHECKMULTISIG      : 0xae,
  OP_CHECKMULTISIGVERIFY: 0xaf,
  
  //locktime
  OP_CHECKLOCKTIMEVERIFY: 0xb1,
  OP_CHECKSEQUENCEVERIFY: 0xb2,
}
class Opcode extends Number{
  constructor(v){
    if(typeof v === "string")
      v = CODELIST[v.toUpperCase()] || -1;

    super(v);
  }
  
  get type(){
    if(0x00 <= this && this <= 0x60)
      return "constant";
    
    if(0x61 <= this && this <= 0x6a)
      return "control";
      
    if(0x6b <= this && this <= 0x7d)
      return "stack";
      
    if(0x7e <= this && this <= 0x82)
      return "splice";
      
    if(0x83 <= this && this <= 0x88)
      return "logic";
      
    if(0x8b <= this && this <= 0xa5)
      return "arithmetic";
      
    if(0xa6 <= this && this <= 0xaf)
      return "crypto";
      
    if(0xb1 <= this && this <= 0xb2)
      return "locktime";
      
    return false;
  }
  
  valueOf(){
    return super.valueOf();
  }
  
  toString(){
    if(0x01 <= this && this <= 0x4b)
      return "OP_PUSHDATA";
    return Object.keys(CODELIST).filter( k => CODELIST[k] == this )[0] || "UNKNOWN";
  }
}
Object.keys(CODELIST).forEach(k => {
  Object.defineProperty(Opcode, k.slice(2), {
      value: CODELIST[k]
  });
});
module.exports = Opcode;
