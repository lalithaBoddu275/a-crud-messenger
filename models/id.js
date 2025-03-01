const mongoose = require('mongoose');

main().then((res)=>{
    console.log("connected");

}).catch((err)=>{
    console.log(err);
})

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,

}) ;

const user=mongoose.model("user",userSchema);
const user2=new user({
    name:"eve",
    email:"adam@yahoo.in",
    age:48,
});
 user2.save().then((res)=>{
    console.log(res);
 }).catch((err)=>{
    console.log(err);
 })


