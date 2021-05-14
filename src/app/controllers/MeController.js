//sử dụng model
const ProductWomen=require('../models/ProductWomen');
const ProductMen=require('../models/ProductMen');
//cài đại middleware để chuyển đổi đối tượng lấy từ database
const {mutipleMongooseToObject}=require('../../util/mongoose');
class MeController{
    //-----------------ProductsWomen------------------------//
    //Hàm xử lý render ra dữ liệu lưu trữ
    storedProductsWomen(req,res,next){
        let ProductQuery=ProductWomen.find();
        if(req.query.hasOwnProperty("_sort")){
            ProductQuery=ProductQuery.sort({
               [req.query.column]:req.query.type,
            });
        }
        Promise.all([ProductQuery,ProductWomen.countDocumentsDeleted()])
        .then(([ProductsWomen,countDeleted])=>{
            ProductsWomen =mutipleMongooseToObject(ProductsWomen);
        res.render('me/productsWomen/stored-products',{
            ProductsWomen:ProductsWomen,
            countDeleted,
        })
        })
        .catch(next);
    }

    //hàm xử lý render ra dữ liệu đã xóa mềm trong thùng rác
    trashProductsWomen(req,res,next){
        ProductWomen.findDeleted()
        .then((ProductsWomen) => {
            ProductsWomen=mutipleMongooseToObject(ProductsWomen);
            res.render('me/productsWomen/trash-products',{
                ProductsWomen:ProductsWomen
            })

        })
        .catch(next);
    }
    //--------------------- End ProductWomen----------------------/

    //-----------------ProductsWomen------------------------//
    storedProductsMen(req,res,next){
        let getProductQuery=ProductMen.find();
        if(req.query.hasOwnProperty("_sort")){
            ProductQuery=ProductQuery.sort({
                [req.query.column]:req.query.type,
             });
        }
        Promise.all([getProductQuery,ProductMen.countDocumentsDeleted()])
        .then(([ProductsMen,countDeleted])=>{
            ProductsMen=mutipleMongooseToObject(ProductsMen);
            res.render('me/productsMen/stored-products',{
                ProductsMen,
                countDeleted
            })
        })
        .catch(next);
    }

    trashProductsMen(req,res,next){
        ProductMen.findDeleted()
        .then((ProductMens)=>{
            ProductMens=mutipleMongooseToObject(ProductMens);
            res.render('me/productsMen/trash-products',{ProductMens});
        })
        .catch(next);
    }
}
module.exports=new MeController;