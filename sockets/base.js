module.exports = function (io,list) {io.on('connection', function(socket){
  //Event when a user gets disconnected
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
    io.emit('message',user.userName+' left');
  });
  //Print any message
  socket.on('message', function(msg){
    io.emit('message',msg);
  });
  //Message sent by a user
  socket.on('messageUser', function(msg){
    io.emit('message',msg.user+":"+msg.message);
  });
  //Add a user to online users list
  socket.on('add',function(user){
    list[list.length] = {'userName':user,'socket':socket.id};
    io.emit('message',user+" connected");
    io.emit('addUser',list);
  });
  //Send personal chat request to appropriate user
  socket.on('sendPersonalChatRequest',function(chatRequest){
    io.sockets.connected[chatRequest.reciever].emit('recievePersonalChatRequest', chatRequest.sender);
  });
  //Confirm request sent from a user
  socket.on('acceptChatRequest',function(data){
    console.log('acceptChatRequest');
    var sender;
    list.forEach(function( obj ) {
      if(obj.userName == data.sender)
      sender= obj;
    });
    //console.log(data.reciever);
    //console.log(sender.socket);
    //console.log(io.sockets.connected);
    io.sockets.connected[sender.socket].emit('requestAccepted', data.reciever);
  });
});};
