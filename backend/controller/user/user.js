//@collapse
const User = require('../../models/user/user')
const emailSetting = require('../../helper/sendEmail')

//Register
const register = async(req,res)=>{

    try{
        const user = new User(req.body)
        await user.save()
        emailSetting(req.body.email ,"test email" )
            res.status(200).send({
                apiStatus : true ,
                data : user ,
                message: "User added successfuly"
            })
        
    }catch(e){
        console.log("error" ,e)
        res.status(500).send({
            apiStatus : false ,
            data : e ,
            message: "Error In Register"
        })
    }
}
//Login
const login = async(req,res)=>{
    
     try{
        const loginedUser =  await User.loginUser(req.body.email,req.body.password)
        const token =  await loginedUser.generateToken()
     
        res.status(200).send({
            apiStatus: true,
            data : {user:loginedUser , token:token} ,
            message: "user logged in"
        })
      

     }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error in logging"
        })
    }
}
//My profile
const myProfile = (req,res)=>{
    try{
        res.status(200).send({
            apiStatus: true,
            data : req.user,
            message: "user profile"
        })
     }catch(e){
       res.status(500).send({
           apiStatus: false,
           data: e.message,
           message: "cannot find the user data"
       })
   }
}
//LogOut
const logOut =async(req,res)=>{
    try{
       const tokens = req.user.tokens
       const index = searchUserIndex(tokens ,req.token )
       tokens.splice(index ,1)
       await req.user.save()
       res.status(200).send({
           apiStatus: true,
           data: req.user,
           message: "user logged out successfuly"
       })
    }catch(e){
       res.status(500).send({
           apiStatus: false,
           data: e.message,
           message: "cannot logout"
       })
   } 
}
//LogOutAll
const logOutAll = async(req,res)=>{
    try{
      req.user.tokens = []
      await req.user.save()
      res.status(200).send({
       apiStatus: true,
       data: req.user,
       message: "logged out from all devices"
   })

    }catch(e){
       res.status(500).send({
           apiStatus: false,
           data: e.message,
           message: "cannot logout from all devices"
       })
}
}
//EditMyProfile
const editMyProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        if(user){
            let new_data = req.body
           for(n in new_data){
              user[n] = new_data[n]
           }
        }
        await user.save()
        res.status(200).send({
            apiStatus: true,
            data: user ,
            message:"user updated successfuly"
    })
     }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "cannot update this user"
        })
     }
}
const addImg  = async(req,res)=>{
    console.log('image' ,req.file)
    res.status(200).send({data:'image uploaded successfuly'})
}

const searchUserIndex = (allTokens , userToken)=>{
    index = allTokens.findIndex(t =>t.token == userToken)
    console.log('index',index)
    return index 
 } 
module.exports = { register,login , myProfile ,
                  logOut , logOutAll , editMyProfile , addImg}
