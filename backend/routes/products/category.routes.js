
const category = require('../../controller/product/category')
const router   = require('express').Router() 
const auth     = require('../../middleware/auth')
const checkPosition = require("../../middleware/checkPosition")


//1,2,3
router.get('/all_category',category.getAllCategories)
//1,2
router.post('/add_category',auth,checkPosition.checkIfAdminOrSalesman,category.addCategory)
//1
router.delete('/delete_category/:id',auth,checkPosition.checkIfAdmin,category.deleteCategory)
//1,2
router.put('/update_category/:id',auth,checkPosition.checkIfAdminOrSalesman,category.updateCategory)

module.exports = router 

