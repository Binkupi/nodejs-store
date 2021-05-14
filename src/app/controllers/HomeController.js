//sử dụng model
const ProductWomen=require('../models/ProductWomen');
const ProductMen=require('../models/ProductMen');
//cài đại middleware để chuyển đổi đối tượng lấy từ database
const {mutipleMongooseToObject}=require('../../util/mongoose');
class HomeController{
renderProduct(req,res,next){
    Promise.all([ProductWomen.find({}),ProductMen.find({})])
    .then(([ProductsWomen,ProductsMen])=>{
        ProductsWomen =mutipleMongooseToObject(ProductsWomen);
        ProductsMen=mutipleMongooseToObject(ProductsMen);
       res.render('home',{
           ProductsWomen:ProductsWomen,
           ProductsMen:ProductsMen,
       });
    })
    .catch(next);

}
}
module.exports=new HomeController;