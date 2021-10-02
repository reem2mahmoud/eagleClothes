
const mongoose = require('mongoose')
const Type = new mongoose.model('Type',{
   name:{
       type: String ,
       trim : true ,
       required: true ,
       minlength:5,
       maxlength: 10 
   },
   
})
module.exports = Type