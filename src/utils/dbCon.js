const mongoose = require('mongoose')

const dbCon = async()=>{
    const connection = mongoose.connect(process.env.MONGO_URL)

    if(connection){
        console.log("MongoDB is connected successfully!")
    }else{
        console.log("MongoDB is not connected")
    }
}

module.exports = dbCon