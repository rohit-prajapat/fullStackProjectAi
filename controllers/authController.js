const UserModel = require('../models/UserModel');
const errorResponse = require('../utils/errorResponse');
exports.sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success :true,
        token,
    });
};
exports.registerController = async(req,res,next)=>{
    try{

        console.log(`${req.body.username}`.bgRed.white)
        const {username,email,password} = req.body;
        const existingEmail = await UserModel.findOne({email});
        if(existingEmail){
            return next(new errorResponse('email alreay exist : ','909'));
        }

        const user = await UserModel.create({username,email,password});

        this.sendToken(user,201,res);


    }catch(err){
        return next(err);
    }
};


// userSchema.methods.matchPassword = async function(password){
//     return await bcrypt.compare(password,this.password);
// }


exports.loginController = async(req,res,next)=>{
    try{
        const {email ,password} = req.body;
        if(!email || !password){
            return next(new errorResponse('please provide email and password',232));
        }
        const user = await UserModel.findOne({email});
        if(!user)
        {
            return next('invalid creditial',230);
        }
        console.log(user.matchPassword);
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new errorResponse('invalid creditial',922));
        }
        this.sendToken(user,200,res);
    }catch(err){
        next(err);
    }
};

exports.logoutController = async()=>{

    res.clearCookie('refreshToken')
    return res.status(200).json({
        success : true,
        message : 'logout succesfully'
    })

};