const express = require('express');
const socketio= require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const Message = require('./model/message')
const EventLog = require('./model/eventLog')
const {addUser, removeUser, getUser, getUserInRoom} = require ('./users');

const uri = 'mongodb+srv://user:user@cluster0-n7lzl.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const db = mongoose.connection;

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log('user connected');

    socket.on('join', ({name,room}, callback)=>{
        const user = addUser({id: socket.id,name,room});
        console.log(user)
        socket.join(user.room);
        socket.emit('message',{user:'admin',text:`${user.name}, welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined`});
        const eventLog= new EventLog({
            event: 'CONNECTION',
            userName: name,
            date:  new Date(),
            room: room
        });
        eventLog.save();
        callback();
    });

    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id);
        console.log(user);
        console.log(user.room)
        io.to(user.room).emit('message',{user: user.name, text:message});
        const newMessage= new Message({
            chat: user.room,
            userName: user.name,
            message: message
        });
        newMessage.save();
        callback();
    });

    socket.on('disconnect',()=>{
        console.log('user left');
    });
});


app.use(router);


server.listen(PORT, ()=>(console.log(`server running on port ${PORT}`)));