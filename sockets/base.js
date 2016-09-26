module.exports = function (io) {io.on('connection', function(socket){
  io.emit('message','a user connected');
  // console.log('a user connected');
  socket.on('disconnect', function(){
    io.emit('message','user disconnected');
  });
  socket.on('message', function(msg){
    // console.log('message: ' + msg);
    io.emit('message','message: '+msg);
  });
});};
