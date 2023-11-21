// require('dotenv').config()
const mongoose = require('mongoose');
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("db is connected");
    }
})