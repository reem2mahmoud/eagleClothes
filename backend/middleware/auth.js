/*get authroization value from header
 verfiy token to get user_id
 search _id , token for which user
 if !user => not auth
 return user
*/
const User = require("../models/user/user")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    try{
       const token = req.header('Authorization').replace('Bearer ','')
       const decode = jwt.verify(token,process.env.JWTKEY)
       const user = await User.findOne({_id:decode._id, 'tokens.token':token})
       if(!user) throw new Error('user not found')
       req.user = user 
       req.token = token 
       next()
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"unAuthorized"
        })
    }

}
module.exports = auth