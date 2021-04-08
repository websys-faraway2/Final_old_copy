var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var io = require('socket.io')(http);
require('dotenv').config();
const path = require('path');

app.use(express.static(path.join(__dirname, './app/dist/app')));

// connect to mongodb
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Successfully Connected");
});
mongoose.connect(process.env.DB_CONN);

// user connected even handler
io.on('connection', function(socket){
  
  // log & brodcast connect event
  console.log('a user connected');
  
  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // message received event handler
  socket.on('newMessage', function(msg){
    // log chat msg
    console.log('newMessage: ' + msg.message);
    
    // broadcast chat msg to others
    socket.broadcast.emit('newMessage', { message: msg.message });
    
  });
  
});

// app.listen(3000, () => {
//   console.log(`app listening at http://localhost:3000`)
// })

http.listen(3000, () => {
  console.log('socket listen at http://localhost:3030')
})
