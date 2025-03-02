const express= require('express');
const app=express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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
//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  try {
      let foundChat = await chat.findById(id);
      if (!foundChat) {
          return res.status(404).send("Chat not found!");
      }
      res.render("edit.ejs", { chat: foundChat });
  } catch (err) {
      console.log("Error fetching chat:", err);
      res.status(500).send("Internal Server Error");
  }
});

app.patch('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body; // Ensure the field name matches your form

  try {
      let updatedChat = await chat.findByIdAndUpdate(
          id, 
          { msg: msg },  // Update only the message field
         
      );

      if (!updatedChat) {
          return res.status(404).send("Chat not found!");
      }

      console.log("Chat updated:", updatedChat);
      res.redirect("/chats");  // Redirect to chats list after updating

  } catch (err) {
      console.error("Error updating chat:", err);
      res.status(500).send("Internal Server Error");
  }
});
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  
  try {
      let deletedChat = await chat.findByIdAndDelete(id);

      if (!deletedChat) {
          return res.status(404).send("Chat not found!");
      }

      
      res.redirect("/chats"); // Redirect to chat list after deletion

  } catch (err) {
      console.error("Error deleting chat:", err);
      res.status(500).send("Internal Server Error");
  }
});



app.get("/",(req,res)=>{
    console.log("hi nodejs");
    res.send("working");
})
 app.listen(3001,()=>{
    console.log("server is listening on port number 3001");
 });
 
 