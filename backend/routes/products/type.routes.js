const type = require('../../controller/product/type')
const router = require('express').Router() 
const auth     = require('../../middleware/auth')
const checkPosition = require("../../middleware/checkPosition")

//1,2,3
router.get('/all_types',type.getAllTypes)
//1,2
router.post('/add_type',auth,checkPosition.checkIfAdminOrSalesman,type.addType)
//1
router.delete('/delete_type/:id',auth,checkPosition.checkIfAdmin,type.deleteType)
//1,2
router.put('/update_type/:id',auth,checkPosition.checkIfAdminOrSalesman,type.updateType)

module.exports = router 