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

/////////////////////////////////// DATA MDOELS ///////////////////////////////////
// Messages
//    with time stamp? 
//    content & chat room?
var chatMessage = new mongoose.Schema({
  usertoken: mongoose.ObjectId,
  roomtoken: String,
  content: String,
  timestamp: Date
});
var Message = mongoose.model('Message', chatMessage);

// USER
//    unexplicit user / token form
//    nickname
var userEntity = new mongoose.Schema({
  usertoken: mongoose.ObjectId,
  nickname: String
})
var User = mongoose.model('User', userEntity);

// ROOM
//    name & token
//    public/private
//    type||tag
var roomEntity = new mongoose.Schema({
  roomtoken: mongoose.ObjectId,
  roomname: String,
  usertokens: Array,
  public: Boolean,
  tags: Array
})
var Room = mongoose.model('Room', roomEntity);

// WORKFLOW
//    [pre] -> this -> [next]
//    name || room token || user token
//    time stamp(create) || due time
//    done
var workFlow = new mongoose.Schema({
  worktoken: mongoose.ObjectId,
  roomtoken: String,
  usertoken: String,
  previous: String,
  next: String,
  timestamp: Date,
  name: String,
  duetime: Date,
  isdone: Boolean
})
var Workflow = new mongoose.model('Workflow', workFlow);

app.post('/api', (req, res) => {
  console.log(req.query)
  res.json({T: 'lll'})
})

// user connected even handler
io.on('connection', (socket) => {
  
  // log & brodcast connect event
  console.log('a user connected to public room');
  
  // log disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // join room message
  socket.on('join room', (arg1, callback) => {
    console.log(arg1);
    callback({status: 'ok'})
  });

  // message received event handler
  socket.on('newMessage', (msg) => {
    // log chat msg
    console.log(msg.id + ': ' + msg.message);
    
    // broadcast chat msg to others
    socket.broadcast.emit('newMessage', { id: msg.id, message: msg.message });
    
  });
  
});

app.listen(3030, () => {
  console.log(`api listening at http://localhost:3030`)
})

http.listen(3000, () => {
  console.log('socket listen at http://localhost:3000')
})
