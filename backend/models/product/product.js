
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
    },
   userId:{
      type:mongoose.Schema.Types.ObjectId
     },
    image:{
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    size:[{  type : String} ],
    color:[{   type:String}],
    product_group: {    // women , men , new born
        type: String,
        required: true,
        trim: true,
    },
    product_type: {    // dress , jumbsuit , t-shirt
        type: String,
        required: true,
        trim: true,
    },
    product_category:{  //  sale =>1 ,  no_sale=>0
        type: String,
        trim: true,
    },
    is_avaliable: {
        type: Boolean,
        required: true ,
        default: true 
    },
    number_in_stock:{
        type:Number ,
        
    } ,
    discount:{
        type:Number ,
        default: 0
    },
    image:{}

} , {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product