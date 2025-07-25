const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URI;

const Schema = new mongoose.Schema({

})

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoDB is connected Successfully...");
    }).catch((err)=>{
        console.log('MongoDB connection error: ',err);
    })