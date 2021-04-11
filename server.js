const express =require('express');
const app= express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {v4 : uuidv4 }= require("uuid");
//const { reduce } = require('async');

const server = require('http').Server(app);
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



server.listen(3000);