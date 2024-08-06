const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const cookie = require('cookie');

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        require :[true,'username is required : ']
    },
    email : {
        type :String,
        require :[true,'email is required '],
        unique : true,
    },
    password :{
        type : String,
        require :[true,'password is required '],
        minlength :[6,'passwrod length should be >6']
    },
    customerId :{
        type :String,
        default :"",
    },
    subscription:{
        type :String,
        default :"",
    },
})

//hash

// userSchema.pre("save", async function(next){
//     if(!this.isModified('password')) next();
//     else{
//         const salt = await bcrypt.genSalt(5);
//         this.password = await bcrypt.hash(this.password,salt);
//         next();
//     }
// });


// userSchema.pre("save", async function (next) {
//     //update
//     if (!this.isModified("password")) {
//       next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     console.log(this.password);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip if password is not modified
    }
    
    try {
        
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass errors to next middleware
    }
});

//match
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//sign token

userSchema.methods.getSignedToken = function(res){
    const accessToken = JWT.sign({id: this._id},process.env.JWT_ACCESS_SECRET,{expiresIn : process.env.JWT_ACCESS_EXPIREIN})

    const refreshToken = JWT.sign({id : this._id},process.env.JWT_REFRESH_TOKEN ,{expiresIn : process.env.JWT_REFRESH_EXIPREIN });

    res.cookie('refreshToken',`${refreshToken}`,{maxAge : 86400 * 7000,httpOnly : true});
}

const User = mongoose.model('User',userSchema);

module.exports = User;