require("dotenv").config({path: `.${process.env.NODE_ENV}.env`})
const express = require("express")
const bodyParser = require("body-parser")
const rootRouter = require("./route/index")
const resValidator = require("./middleware/validator.middleware")
const cors = require('cors') 
const path = require("path")

const app = express() 

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
})); 
app.use(express.json())
app.use("/api", rootRouter)
app.use(resValidator)

if(process.env.NODE_ENV === 'prod') {
    app.use('/', express.static(path.join(__dirname, '..', 'exp-client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'exp-client', 'build', 'index.html'))
    })
}


function BOOTSRAP(port) {
    app.listen(port, () => console.log(`Process started on port ${port}`))
}

BOOTSRAP(process.env.PORT)