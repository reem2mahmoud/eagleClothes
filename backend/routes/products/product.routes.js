const products = require('../../controller/product/product')
const router   = require('express').Router()
const auth     = require('../../middleware/auth')
const checkPosition = require("../../middleware/checkPosition")

//delete            1
router.delete('/delete_product/:id',auth,checkPosition.checkIfAdmin,products.deleteProduct)
//add               1,2
router.post('/add_product',auth,checkPosition.checkIfAdminOrSalesman , products.addProduct)
//update            1,2
router.put('/update_product/:id',auth,checkPosition.checkIfAdminOrSalesman,products.updateProduct)

//getAll            1,2,3
router.get('/all_products',products.getAllProducts)
//getOne            1,2,3
router.get('/single_product/:id',products.getProduct)
//getRecent          1,2,3
 router.get('/recently_products',products.getRecentlyProducts)
//getDiscount        1,2,3
 router.get('/discount_products',products.getDiscountProducts)

 //addToCart           3
 router.put('/add-to-cart',auth,checkPosition.checkIfCustomer,products.addToCart)
 //addToWhishlist      3
 router.put('/add-to-whishlist',auth,checkPosition.checkIfCustomer,products.addToWhishlist)
 //deleteFromCart      3 
 router.put('/delete-from-cart',auth,checkPosition.checkIfCustomer,products.deleteFromCart)
 //deleteFromWishlist   3
 router.put('/delete-from-wishlist',auth,checkPosition.checkIfCustomer,products.deleteFromWishlist)
 
 //show products in cart  1,2,3  
 router.get('/cart-products',auth,products.getCartProducts) 
 //show product in whishlist 1,2,3
 router.get('/wishlist-products',auth,products.getWishlistProducts) 

 //add review
 //show to rated products

 




module.exports = router 




