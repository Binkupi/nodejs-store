const express=require('express');
const router=express.Router();
const userController=require('../app/controllers/userController');
//sử dụng chức năng đăng nhập
var passport = require('passport');
const { check, validationResult } = require('express-validator');

//Di chuyển đến trang đăng nhập
router.get('/login',userController.renderLogin);


//di chuyển đến trang đăng kí
router.get('/register',userController.renderRegister);

//phương thức gửi dữ liệu đăng kí
// router.post('/registerOk',  
//     passport.authenticate('local.signup', { successRedirect: '/user/login',
//                                     failureRedirect: '/user/register',
//                                     failureFlash: true })
//   );
// router.post('/registerOk',function(req,res,next){
//     res.send("ahihi");
//     next;
// });
module.exports=router;