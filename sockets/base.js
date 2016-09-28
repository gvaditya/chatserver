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
  //Message sent by a user to group
  socket.on('messageUser', function(msg){
    io.emit('groupMessage',{'sender':msg.user,'message':msg.message});
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
    io.sockets.connected[sender.socket].emit('requestAccepted', data.reciever);
  });
  //Recieve personal message and send it corresponding members
  socket.on('messagePersonal', function(msg){
    var messageReciever,messageSender;
    list.forEach(function(obj){
      if(obj.userName == msg.reciever)
      messageReciever = obj;
      else if(obj.userName == msg.sender)
      messageSender = obj;
    });
    //io.sockets.connected[messageSender.socket].emit('sendPersonalMessage',{'message':"You:"+msg.message,'sender':msg.sender,'reciever':msg.reciever});
    io.sockets.connected[messageReciever.socket].emit('sendPersonalMessage',{'message':msg.sender+":"+msg.message,'sender':msg.sender,'reciever':msg.reciever});
  });
});};
