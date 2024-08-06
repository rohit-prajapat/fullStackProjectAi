const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/chatgptproject')
        console.log(`Connection successfull to db`.bgGreen.white);
    }
    catch(err){
        console.log(`Connection falied to database due to :${err}`.bgRed.white);
    }
}

module.exports = connectDB;