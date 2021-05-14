const homeRouter=require('./home');
const productWomenRouter=require('./productWomen');
const productMenRouter=require('./productMen');
const meRouter=require('./me');
const userRouter=require('./user');
function route(app){
    // app.get('/', (req, res) => {
    //     res.render('home');
    //   })
    //chuyển hướng đến đường dẫn /me/
    app.use('/me',meRouter);

    //chuyển hướng dến đường dẫn /
    app.use('/',homeRouter);

    //Chuyển hướng đến đường dẫn /productswomen/
    app.use('/productsWomen',productWomenRouter);

     //Chuyển hướng đến đường dẫn /productsmen/
    app.use('/productsMen',productMenRouter);

    //Chuyển hướng đến đường dẫn /user/
    app.use('/user',userRouter);

}
module.exports=route;