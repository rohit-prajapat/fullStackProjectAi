const express = require('express');
const { registerController, loginController, logoutController } = require('../controllers/authController');


const router = express.Router();
//register
router.post('/register',registerController);
//login
router.post('/login',loginController);
//logout
router.post('/logout',logoutController);

router.get('/test',(req,res)=>{
    res.send("working : ");
})
module.exports = router;