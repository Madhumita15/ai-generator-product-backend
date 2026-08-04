const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


require('dotenv').config()

const express = require('express')
const dbCon = require('./src/utils/dbCon')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

dbCon()
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRouter = require('./src/router/auth.router')
const productRouter = require('./src/router/product.router')
app.use("/api",userRouter)
app.use("/api",productRouter)
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "AI Product Generator Backend is running ",
  });
});




const PORT = process.env.PORT || 3007
app.listen(PORT, ()=>{
    console.log(`app is listening on http://localhost:${PORT}`)
})