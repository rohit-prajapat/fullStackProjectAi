const errorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next)=>{
    let error = new errorResponse(err.message,101);
}

module.exports = errorHandler;