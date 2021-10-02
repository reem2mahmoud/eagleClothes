const mongoose = require('mongoose')
const Category = new mongoose.model('Category',{
   name:{
       type: String ,
       trim : true ,
       required: true ,
       minlength:4,
       maxlength: 15 
   }
   
})
module.exports = Category