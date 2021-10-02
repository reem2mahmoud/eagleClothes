const Category = require('../../models/product/category')

const getAllCategories = async(req,res)=>{
    try{
        await Category.find()
         .then((data)=>{
             res.send(data)
         }).catch((e)=>{
             res.send(e)
         })
        
    }catch(e){
          res.send(e)
    }
  
}
const addCategory = async(req,res)=>{
  
    try{
        
       const category = new Category(req.body)
       await category.save()
       .then(()=>{
           res.send(category)
       }).catch((e)=>{
            res.send(e)
       })
    }catch(e){
        res.send(e)
    }
}
const deleteCategory = async(req,res)=>{
    try{
        await Category.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.send('category successfully deleted')
        }).catch((e)=>{
            res.send(e)
        })
    }catch(e){
        res.send(e)
    }
}
const updateCategory = async(req,res)=>{
    try{
        await Category.findByIdAndUpdate(req.params.id , req.body ,{runValidators:true})
        .then(()=>{
            res.send('category updated successfully')
        }).catch((e)=>{
            res.send(e)
        })
    }catch(e){
        res.send(e)
    }
}

module.exports ={getAllCategories , 
                 addCategory , 
                 deleteCategory ,
                 updateCategory}