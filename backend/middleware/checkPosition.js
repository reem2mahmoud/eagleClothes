const User = require('../models/user/user')

const checkIfAdmin = async (req, res ,next) => {
    try {
        
        const user = await User.findById(req.user._id)
        if(user.userType == 1){
            next()
        }else{
            res.status(200).send({
                apiStatus: false,
                data: user,
                message:"Soorry , only admin can do this task"
            })
        }
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"Error to check if Admin"
        })
    }


}
const checkIfAdminOrSalesman = async (req, res ,next) => {
    try {
        
        const user = await User.findById(req.user._id)
        if(user.userType == 1 || user.userType == 2){
            next()
        }else{
            res.status(200).send({
                apiStatus: false,
                data: user,
                message:"Soorry , only admin or salesMan can do this task"
            })
        }
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"Error to check position"
        })
    }


}
const checkIfCustomer= async (req, res ,next) => {
    try {
        
        const user = await User.findById(req.user._id)
        if(user.userType == 3){
            next()
        }else{
            res.status(200).send({
                apiStatus: false,
                data: user,
                message:"Soorry , only customer "
            })
        }
    }catch(e){
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message:"Error to check position"
        })
    }


}

module.exports = {
    checkIfAdmin , checkIfAdminOrSalesman ,checkIfCustomer
}