const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


require('dotenv').config()

const express = require('express')
const dbCon = require('./src/utils/dbCon')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

dbCon()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRouter = require('./src/router/auth.router')
const productRouter = require('./src/router/product.router')
app.use("/api",userRouter)
app.use("/api",productRouter)



const PORT = process.env.PORT || 3007
app.listen(PORT, ()=>{
    console.log(`app is listening on http://localhost:${PORT}`)
})