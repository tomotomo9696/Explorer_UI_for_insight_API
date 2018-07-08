import io from 'socket.io-client';
import config from './config';
import Vue from "vue";

const socket = io(config.socket);





const emitter = new Vue({
  methods:{
    emit(eventName, message){
      socket.emit(eventName, message)
    }
  }
});

socket.on('connect', () => {
  socket.emit("subscribe", "inv");
  socket.emit("subscribe", "sync");
  ["tx", "block", "blockHeight", "status"].forEach(k => {
    socket.on(k, function(data){
      emitter.$emit(k, data);
    });
  });
});



export default emitter;
