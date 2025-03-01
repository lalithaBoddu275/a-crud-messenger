const express= require('express');
const app=express();
const mongoose = require('mongoose');

const path=require("path");
const chat=require('./models/chat.js');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
main().then(()=>{
  console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get('/chats',async(req,res)=>{
  let chats= await chat.find();
  console.log(chats);
  res.render("index.ejs",{chats})
})
app.post("/chats",(req,res)=>{
  let {from,to,msg}=req.body;
  let newchat=new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()

  });
  newchat.save().then((res)=>{
    console.log("chat was saved");
  }).catch((err)=>{
    console.log(err);
  })
  res.redirect("/chats");
})
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})
app.get("/",(req,res)=>{
    console.log("hi nodejs");
    res.send("working");
})
 app.listen(3001,()=>{
    console.log("server is listening on port number 3001");
 });