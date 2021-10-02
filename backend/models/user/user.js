const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Product = require("../product/product")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (validator.isEmpty(value)) throw new Error('invalid username')
        }
    },
    userType:{
        type:Number ,
        required:true ,
        enum:[1,2,3]    // 1=>admin , 2=>salesman , 3=>customer
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        //Minimum eight characters, at least one letter, one number and one special character
        // validate(value) {
        //     if (!value.includes("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")) throw Error('invalid password')
        // }
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }

    },
    addresses: [{
        title: {
            type: String,
            trim: true
        },
        details: {
            type: String,
            trim: true
        }
    }],
    //    picture:{
    //        type: String 
    //    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: "Product"
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: "Product"
    }],
    tokens:[
        {
            token:{
                type:String , 
                required:true 
            }
        }
    ]


}, {
    timestamps: true
})
//choose what should be shown
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}
//bcrypt password
userSchema.pre('save', async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
})
//login
userSchema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) throw new Error('invalid email')
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) throw new Error('invalid password')
    return user
}
 //generate token
 userSchema.methods.generateToken = async function(){
    const user = this
    console.log('user',user) ; 
    const token = jwt.sign({_id:user._id},process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('User', userSchema)
module.exports = User