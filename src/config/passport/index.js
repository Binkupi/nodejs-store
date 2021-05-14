// //config/passport.js
// //load các module
// const passport=require('passport');
// //load user models
// const User=require('../../app/models/user');

// //Sử dụng localStrategy để xác thực tên người dùng và mật khẩu
// const LocalStrategy=require('passport-local').Strategy;

// //passport session session
// //used to serialize the user for the session 
// passport.serializeUser(function(user,done){
//     done(null,user.id);
// })

// //used to deserialize the user
// passport.deserializeUser(function(id,done){
//     User.findById(id,function(err,user){
//         done(err,user);
//     })
// })

// //local sign-up
// passport.use('local.signup',new LocalStrategy({
//     //mặc định local strategy sử dụng username và password
//     //chúng ta có thể cấu hình Lại
//     usernameField:'email',
//     passwordField:'password',
//     passReqToCallback:true,//Cho phép chúng ta gửi request lại hàm callback
// },function(req,email,password,done){
//     //Tìm một user theo email
//     //Chúng ta kiểm tra xem user đã tồn tại hay không
//     User.findOne({'local.email':email},
//     function(err,user){
//         if(err){return done(err);}
//         if(user){
//             return done(null,false,
//                 {message:'Email is already in use.'})
//         }

//         //Nếu chưa user nào sử dụng email này
//         //Tạo user mới 
//         let newUser=new User();
//         //Lưu thoogn tin cho tài khoản local
//         newUser.email=email;
//         newUser.password=password;

//         //Lưu User
//         newUser.save(function(err,result){
//             if(err){
//                 return done(err);
//             }
//             return done(null,newUser);
//         })
//     })
// }))
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 const User=require('../../app/models/user');
const bcrypt = require('bcrypt');
// generate salt to hash password
const saltRounds = 10;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Passport register
passport.use('local.signup', new LocalStrategy({
    usernameField : 'email',
    passswordField : 'password',
    passReqToCallback : true
},function(req, email, password, done){
    User.findOne({
      'email' : email       
  }, function(err, user){
      if(err){
          return done(err)
      }
      if(user){
        console.log('email đã tồn tại')
          return done(null, false, {
              message : 'Email đã được sử dụng, vui lòng chọn email khác'    
          })
      }

      var newUser = new User();
      newUser.email = email;

      bcrypt.hash( password, saltRounds, function(err, hash) {
        newUser.password=hash;
          newUser.save(function(err, result) {
              if (err) {
                  return done(err);
              } else {                    
                return done(null, newUser);            
              }
          });
    });

  })
}));

/* Passport login */
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({
        'email': email
    })
        .then(function (user) {
            console.log(user.password)
            console.log(password)
            bcrypt.compare(password, user.password, function (err,result) {
                console.log(result)
                if (err) { return done(err); }
                if(!result) {
                    return done(null, false, { message: 'Incorrect username and password' });
                }
                return done(null, user);
            })
        })
        .catch(function (err) {
            return done(err);
        })
}));