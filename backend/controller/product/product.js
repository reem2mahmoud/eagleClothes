
const User= require("../../models/user/user")
const Product = require("../../models/product/product")

const getAllProducts=async(req,res)=>{
    try{
        await Product.find()
         .then((data)=>{
            res.status(200).send({
                apiStatus : true ,
                data : data ,
                message: "Products fetched successfuly"
            })
         }).catch((e)=>{
            res.status(500).send({
                apiStatus : false ,
                data : e.message ,
                message: "Error to fetch products"
            })
         })
        
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error"
        })
    }

}
const addProduct = async(req,res)=>{
    try{
        
        const product = new Product(req.body)
        product.userId = req.user._id
        
        await product.save()
        .then(()=>{
            res.status(200).send({
                apiStatus : true ,
                data : product ,
                message: "Product added successfuly"
            })
        }).catch((e)=>{
            res.status(500).send({
                apiStatus : false ,
                data : e.message ,
                message: "Error to add product"
            })
        })
     }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to add product"
        })
     }

}
const deleteProduct = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.status(200).send({
                apiStatus : true ,
                data : "",
                message: "Product deleted successfuly"
            })
        }).catch((e)=>{
            res.status(500).send({
                apiStatus : false ,
                data : e.message ,
                message: "Error to delete product"
            })
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to delete product"
        })
    }
}
const updateProduct = async(req,res)=>{
    try{
       product = await Product.findByIdAndUpdate(req.params.id , req.body ,{runValidators:true})
        .then(()=>{
            res.status(200).send({
                apiStatus : true ,
                data : product ,
                message: "Product updated successfully"
            })
        }).catch((e)=>{
            res.status(500).send({
                apiStatus : false ,
                data : e.message ,
                message: "Error to update product"
            })
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to update product"
        })
    }
}
const getProduct = async(req,res)=>{
    try{
        await Product.findById(req.params.id)
        .then((product)=>{
            res.status(200).send({
                apiStatus : true ,
                data : product,
                message: "Product fetched successfully"
            })
        }).catch((e)=>{
            res.status(500).send({
                apiStatus : false ,
                data : e.message ,
                message: "Error to fetch product"
            })
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to fetch product"
        })
    }

}
const getRecentlyProducts = async(req,res)=>{

    try{
      const products = await Product.find().sort({ createdAt: -1 }).limit(3)
      if(products){
        res.status(200).send({
            apiStatus : true ,
            data : products ,
            message: "Products Fetched Successfuly"
        })
      }

    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to fetch products"
        })
    }
   
}
const getDiscountProducts = async(req,res)=>{
    try{
        const products = await Product.find({discount:{$gt:0}})
        if(products){
          res.status(200).send({
              apiStatus : true ,
              data : products ,
              message: "Products Fetched Successfuly"
          })
        }
  
      }catch(e){
          res.status(500).send({
              apiStatus : false ,
              data : e.message ,
              message: "Error to fetch products"
          })
      }
     
}
const addToCart = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        user.cart.push(req.body.product_id)
        await user.save()
        res.status(200).send({
            apiStatus : true ,
            data : user ,
            message: "Add product to cart successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to add product to cart"
        })
    }
}
const addToWhishlist = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        user.wishlist.push(req.body.product_id)
        await user.save()
  
        res.status(200).send({
            apiStatus : true ,
            data : user ,
            message: "Add product to cart successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to add product to cart"
        })
    }
}
const deleteFromCart = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        user.cart.pull(req.body.product_id)
        await user.save()
        res.status(200).send({
            apiStatus : true ,
            data : user ,
            message: "Delete product from cart successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to delete product from cart"
        })
    }
}
const deleteFromWishlist = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id)
        user.wishlist.pull(req.body.product_id)
        await user.save()
        res.status(200).send({
            apiStatus : true ,
            data : user ,
            message: "Delete product from wishlist successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to delete product from wishlist"
        })
    }
}
const getCartProducts = async(req,res)=>{
    try{
        const myCart = await User.findById(req.user._id)
        .populate('cart').select('cart')
        res.status(200).send({
            apiStatus : true ,
            data : myCart ,
            message: "Cart fetched successfully"
        })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to get Cart"
        })
    }
    
}
const getWishlistProducts = async(req,res)=>{
    try{
        const myWishlist = await User.findById(req.user._id)
               .populate('wishlist').select('wishlist')
                res.status(200).send({
                    apiStatus : true ,
                    data : myWishlist ,
                    message: "Wishlist fetched successfully"
                })
    }catch(e){
        res.status(500).send({
            apiStatus : false ,
            data : e.message ,
            message: "Error to get wishlist"
        })
    }
    
}


module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProduct ,
    getRecentlyProducts,
    getDiscountProducts ,
    addToCart ,
    addToWhishlist ,
    deleteFromCart,
    deleteFromWishlist ,
    getCartProducts ,
    getWishlistProducts
    
}