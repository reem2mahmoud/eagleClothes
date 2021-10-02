
const mongoose = require('mongoose')
userTypesSchema = new mongoose.Schema({
    usertype:{
        type:String , 
        trim:true ,
        enum:["admin","salesman","customer"]
    }
})