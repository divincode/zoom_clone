const express =require('express');
const app= express();
const server = require('http').Server(app);
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {v4 : uuidv4 }= require("uuid");
const io = require("socket.io")(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
//const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);

//const { reduce } = require('async');

//const server = require('http').Server(app);
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
//    console.log(uuidv4());
    const id= uuidv4();
    res.redirect("/"+id);
   // res.redirect(`/${uuidv4()}`);
}
);

app.get('/:room',(req,res)=>
{
//    console.log("1");
    res.render('room',{room_id : req.params.room});
});

io.on("connection", socket => {
    socket.on("join-room", (room_id) => {
        socket.join(room_id);
        console.log("hello");
 //       socket.to(room_id).broadcast('user-connected');
     socket.broadcast.to(room_id).emit('user-connected');
    });
}
);

server.listen(3000);