var express = require('express')
  , cors = require('cors');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var io = require('socket.io')(http);
require('dotenv').config();
const path = require('path');

// var url = "mongodb+srv://new_user0:zxcasdqwe321@cluster0.t6iag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var url = "mongodb://new_user0:zxcasdqwe321@cluster0-shard-00-00.t6iag.mongodb.net:27017,cluster0-shard-00-01.t6iag.mongodb.net:27017,cluster0-shard-00-02.t6iag.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-i19gfh-shard-0&authSource=admin&retryWrites=true&w=majority"
app.use(express.static(path.join(__dirname, './app/dist/app')));

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

// connect to the database and inform
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

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

const { Schema } = mongoose;
const userSchemaApp = new Schema({
  user_name: { type: String },
  user_token: { type: String },
  number_finishedTasks: { type: Number },
  number_dropedTasks: { type: Number },
  number_times: { type: Number },
  number_connection: { type: Number },

  current_task: { type: String },
  current_task_time: { type: Number },
  current_task_ver: { type: String },

  to_dos: {
    to_do_1: { type: String },
    to_do_1_time: { type: Number },
    to_do_1_ver: { type: String },
    to_do_2: { type: String },
    to_do_2_time: { type: Number },
    to_do_2_ver: { type: String },
    to_do_3: { type: String },
    to_do_3_time: { type: Number },
    to_do_3_ver: { type: String },
    to_do_4: { type: String },
    to_do_4_time: { type: Number },
    to_do_4_ver: { type: String },
    to_do_5: { type: String },
    to_do_5_time: { type: Number },
    to_do_5_ver: { type: String },
  },

  collection_record: {
    collection_1: { type: Boolean },
    collection_1_pop_up: { type: Boolean },
    collection_2: { type: Boolean },
    collection_2_pop_up: { type: Boolean },
    collection_3: { type: Boolean },
    collection_3_pop_up: { type: Boolean },
    collection_4: { type: Boolean },
    collection_4_pop_up: { type: Boolean },
    collection_5: { type: Boolean },
    collection_5_pop_up: { type: Boolean },
    collection_6: { type: Boolean },
    collection_6_pop_up: { type: Boolean },
    collection_7: { type: Boolean },
    collection_7_pop_up: { type: Boolean },
  }

});
const UserApp = mongoose.model('UserApp', userSchemaApp);

app.get('/login/:token', function(req, res) {
  var token = req.params.token;

  UserApp.findOne({user_token: token}).exec(function(err, user) {
    if (user) {
      if (err) res.json(err);
      else res.json({'msg': 'login'})
    }
    else {
      res.json({'msg': 'No token found!'})
    }
  });
})

app.post('/signup', function(req, res) {
  var token = req.query.token;
  console.log(token)

  var thisUserApp = new UserApp({
    user_name: "instantFocus",
    user_token: token,
    number_finishedTasks: 0,
    number_dropedTasks: 0,
    number_times: 0,
    number_connection: 0,
  
    current_task: "none",
    current_task_time: 0,
    current_task_ver: "none",
  
    to_dos: {
      to_do_1: "none",
      to_do_1_time: 0,
      to_do_1_ver: "none",
      to_do_2: "none",
      to_do_2_time: 0,
      to_do_2_ver: "none",
      to_do_3: "none",
      to_do_3_time: 0,
      to_do_3_ver: "none",
      to_do_4: "none",
      to_do_4_time: 0,
      to_do_4_ver: "none",
      to_do_5: "none",
      to_do_5_time: 0,
      to_do_5_ver: "none",
    },
  
    collection_record: {
      collection_1: false,
      collection_1_pop_up: false,
      collection_2: false,
      collection_2_pop_up: false,
      collection_3: false,
      collection_3_pop_up: false,
      collection_4: false,
      collection_4_pop_up: false,
      collection_5: false,
      collection_5_pop_up: false,
      collection_6: false,
      collection_6_pop_up: false,
      collection_7: false,
      collection_7_pop_up: false,
    }
  })
  thisUserApp.save(function (err) {
    if (err) res.json(err);
    res.status(200).json({'msg': 'Save the new account'})
  })
})

app.get('/getUserApp/:token', function(req, res) {
  token = req.params.token
  UserApp.findOne({user_token: token}).exec(function(err, data) {
    if (err) res.json(err);
    else {
        console.log(data)
        res.send(data)
    }
  })
})

app.get('/getprofile', (req, res) => {
  token = req.query.token
  UserApp.findOne({user_token: token}).exec((err, data) => {
    if (err) res.json(err);
    res.status(200).json({
      name: data.user_name,
      task: data.current_task,
      time: data.current_task_time,
      ver: data.current_task_ver
    })
  })
})

app.get('/getcollection', (req, res) => {
  token = req.query.token
  UserApp.findOne({user_token: token}).exec((err, data) => {
    if (err) res.json(err);
    console.log(data.collection_record.collection_1)
    res.status(200).json({
      collection1: data.collection_record.collection_1,
      collection2: data.collection_record.collection_2,
      collection3: data.collection_record.collection_3,
      collection4: data.collection_record.collection_4,
      collection5: data.collection_record.collection_5,
      collection6: data.collection_record.collection_6,
      collection7: data.collection_record.collection_7,
      collection8: data.collection_record.collection_8
    })
  })
})

app.post('/updateName', (req, res) => {
  token = req.query.token
})

app.get('/gettodos', (req, res) => {
  token = req.query.token
  UserApp.findOne({user_token: token}).exec((err, data) => {
    if (err) res.json(err);
    output = []
    output.push({
      task: data.to_dos.to_do_1,
      time: data.to_dos.to_do_1_time,
      ver: data.to_dos.to_do_1_ver
    })
    output.push({
      task: data.to_dos.to_do_2,
      time: data.to_dos.to_do_2_time,
      ver: data.to_dos.to_do_2_ver
    })
    output.push({
      task: data.to_dos.to_do_3,
      time: data.to_dos.to_do_3_time,
      ver: data.to_dos.to_do_3_ver
    })
    output.push({
      task: data.to_dos.to_do_4,
      time: data.to_dos.to_do_4_time,
      ver: data.to_dos.to_do_4_ver
    })
    output.push({
      task: data.to_dos.to_do_5,
      time: data.to_dos.to_do_5_time,
      ver: data.to_dos.to_do_5_ver
    })
    console.log(output)
    res.status(200).json(output)
  })
})

app.post('/addtodos', (req, res) => {
  token = req.query.token
  
  UserApp.findOne({user_token: token}, (err, data) => {
    if (err) throw err;
    data.to_dos.to_do_1 = req.query.task
    data.to_dos.to_do_1_time = req.query.time
    data.to_dos.to_do_1_ver = req.query.ver
    data.save((err, saved) => {
      if (err) return console.log('error saving valid to Db');
      res.status(200).json("ADDED")
    })

  })
})

app.get('/getinfo', (req, res) => {
  token = req.query.token
  UserApp.findOne({user_token: token}).exec((err, data) => {
    if (err) res.json(err);
    res.status(200).json({
      name: data.user_name,
      finished: data.number_finishedTasks,
      dropped: data.number_dropedTasks,
      times: data.number_times,
      count: data.number_connection
    })
  })
})

app.listen(3030, () => {
  console.log(`api listening at http://localhost:3030`)
})

http.listen(3000, () => {
  console.log('socket listen at http://localhost:3000')
})
