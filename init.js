const mongoose = require('mongoose');
const chat=require('./models/chat.js');
main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
 
}
  chat.insertMany([

    {
        from: "neha",
        to:"priya",
        msg:"send your exam sheet",
        created_at:new Date(),
      },
      {
        from: "kaya",
        to:"lavanya",
        msg:"when you are coming to college",
        created_at:new Date(),
      },
      {
        from: "muskaan",
        to:"fahim",
        msg:"i love you",
        created_at:new Date(),
      },

      {
        from: "lalitha",
        to:"taslim",
        msg:"come to room",
        created_at:new Date(),
      },

      {
        from: "kaya",
        to:"lavanya",
        msg:"with whom our room keys are",
        created_at:new Date(),
      },



  ])