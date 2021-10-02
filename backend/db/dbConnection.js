const mongoose = require('mongoose')
const chalk    = require('chalk')


//DB Connection
mongoose.connect(process.env.DbURL)
.then(()=>{
    console.log(chalk.green('DB Connected Successfully'))
}).catch(e=>{
    console.log(chalk.red(`DB Not Connected , There is an Error : ${e}`))
})