const Type = require('../../models/product/type')

const getAllTypes = async(req,res)=>{
    try{
        await Type.find()
         .then((data)=>{
             res.send(data)
         }).catch((e)=>{
             res.send(e)
         })
        
    }catch(e){
          res.send(e)
    }
  
}
const addType = async(req,res)=>{
    try{
       const type = new Type(req.body)
       await type.save()
       .then(()=>{
           res.send("type added successfully")
       }).catch((e)=>{
            res.send(e)
       })
    }catch(e){
        res.send(e)
    }
}
const deleteType = async(req,res)=>{
    try{
        await Type.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.send('type successfully deleted')
        }).catch((e)=>{
            res.send(e)
        })
    }catch(e){
        res.send(e)
    }
}
const updateType = async(req,res)=>{
    try{
        await Type.findByIdAndUpdate(req.params.id , req.body ,{runValidators:true})
        .then(()=>{
            res.send('type updated successfully')
        }).catch((e)=>{
            res.send(e)
        })
    }catch(e){
        res.send(e)
    }
}

module.exports ={getAllTypes , 
                 addType , 
                 deleteType ,
                 updateType}