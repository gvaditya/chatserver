module.exports = function (io,list) {io.on('connection', function(socket){
  socket.on('disconnect', function(){
    var user;
    var result = list.filter(function( obj ) {
      if(obj.socket == socket.id)
      {
        user = obj;
      }
      return obj.socket != socket.id;
    });
    list=result;
    io.emit('addUser',list);
    io.emit('message',user.user+' left');
  });
  socket.on('message', function(msg){
    io.emit('message',msg);
  });
  socket.on('messageUser', function(msg){
    io.emit('message',msg.user+":"+msg.message);
  });
  socket.on('add',function(user){
    list[list.length] = {'user':user,'socket':socket.id};
    io.emit('message',user+" connected");
    io.emit('addUser',list);
  })
});};
