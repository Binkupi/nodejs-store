const User=require('../models/user');
class userController{

    //[GET] /user/register
    renderLogin(req,res,next){
        res.render('user/login');
    }
    
    //[GET] /user/register
    renderRegister(req,res,next){
        res.render('user/register');
    }
    storeUser(req,res,next){
        const result={
            email:'',
            password:''
        }
        result.email=req.body.email;
        result.password=req.body.password;
        const newUser=new User(result);
        newUser.save()
        .then(()=>{
            res.redirect('/user/login');
        })
        .catch(next);

    }
}
module.exports=new userController;