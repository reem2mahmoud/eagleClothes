//requires
const express =  require('express')
const chalk   = require('chalk')
const cors = require('cors')

require('dotenv').config()

require('./db/dbConnection')

const userRoutes   = require('./routes/user/user.routes')
const productRoutes = require('./routes/products/product.routes')
const categoryRoutes = require('./routes/products/category.routes')
const typeRoutes = require('./routes/products/type.routes')

//use
const app = express()
app.use(express.json())
app.use(cors())
//routes
app.use('/user',userRoutes)
app.use('/product',productRoutes)
app.use('/product/category',categoryRoutes)
app.use('/product/type',typeRoutes)

// server
app.listen(process.env.PORT , (err,res)=>{
    if(err) console.log(chalk.red('there is error',err))
    console.log(chalk.green('succesfully connected to the server'))
    
})


module.exports = app 


