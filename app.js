// Require 
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routers/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
//dotenv
dotenv.config();

//mongoose connection
connectDB();

// middleware 
app.use(cors());
app.use(bodyParser.urlencoded({extended :true}));
app.use(express.json());
app.use(morgan('dev'));


app.use(errorHandler);
app.use('/api/v1/auth',authRoutes);



const port = process.env.PORT || 8083;
app.listen(port,()=>{
    console.log(`Server Started : hari Bol.. ${process.env.DEV_MODE} at port ${port}`);
});