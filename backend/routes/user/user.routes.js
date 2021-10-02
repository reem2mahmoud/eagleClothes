const userController = require("../../controller/user/user")
const router = require('express').Router()
const auth = require("../../middleware/auth")
const upload = require("../../middleware/fileUpload")

//register
router.post('/register',userController.register)
//login
router.post('/login' ,userController.login)
//myProfile
router.get('/me',auth,userController.myProfile)
//logout
router.post('/logout',auth,userController.logOut)
//logoutAll
router.post('/logout-all',auth,userController.logOutAll)
//editMyProfile
router.post('/editMyProfile',auth,userController.editMyProfile)
//uploadImg
router.post('/upload-image', auth, upload.single('image'), userController.addImg)
//forget password
//change password


module.exports = router 