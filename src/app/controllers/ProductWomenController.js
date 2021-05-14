//sử dụng model
const ProductWomen=require('../models/ProductWomen');
//cài đại middleware để chuyển đổi đối tượng lấy từ database
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
class ProductController{
show(req,res,next){
    ProductWomen.findOne({slug:req.params.slug})
    .then(ProductWomen=>{
        ProductWomen=mongooseToObject(ProductWomen);
       res.render('productsWomen/show',{
           ProductWomen:ProductWomen,
       });
    })
    
    .catch(next);

}

// chuyển hướng sang trang tạo sản phẩm mới
create(req,res){
    res.render('productsWomen/create');

}

// xử lý form tạo sản phẩm mới
 //[POST] /courses/store
 store (req,res,next){
     req.body.sale=req.body.sale=="true"?true:false;
     req.body.pricereal=Number(req.body.pricereal);
     if(req.body.sale==false){
        req.body.pricesale=Number(req.body.pricereal);
     }else{
        req.body.pricesale=Number(req.body.pricesale);
     }
     req.body.image="img/productsWomen/"+req.file.filename;
     const productwomen=new ProductWomen(req.body);
     productwomen.save()
     .then(()=>res.redirect('/me/stored/productsWomen'))
     .catch(next);
    
 };

 //Xử lý lấy dữ liệu khi người dùng muốn update 1 sản phẩm
 //[GET] /productsWomen/:id/edit
    get(req,res,next){
        ProductWomen.findById(req.params.id)
        .then((ProductWomen)=>{
            ProductWomen=mongooseToObject(ProductWomen);
            res.render('productsWomen/edit',{
                ProductWomen:ProductWomen,
            })
        })
        .catch(next);
    }

    //Xử lý khi cập nhật 1 sản phẩm
    //[PUT] /productsWomen/:id
    update(req,res,next){
        ProductWomen.updateOne({_id:req.params.id},req.body)
        .then(()=>res.redirect('/me/stored/productsWomen'))
        .catch((errol)=>next(errol));
    }

    //Xử lý xóa không thể khôi phục được
    //[DELETE] /productsWomen/:id
    destroy(req,res,next){
        ProductWomen.delete({_id:req.params.id})
        .then(()=>res.redirect('back'))
        .catch((errol)=>next(errol));
    }

    //[PATCH] /product/id/restore
    restore(req,res,next){
        ProductWomen.restore({_id:req.params.id})
        .then(()=>res.redirect('back'))
        .catch(next);
    }

     //[PATCH] /product/id/force
     removeForce(req,res,next){
        ProductWomen.deleteOne({_id:req.params.id})
        .then(()=>res.redirect('back'))
        .catch(next);
    }


    //[POST] /productsWomen/handle-form-action
    handleForm(req,res,next){
        switch(req.body.action){
            case 'delete':
                ProductWomen.delete({_id:{$in:req.body.productIds}})
                .then(()=>{
                    res.redirect('back')
                })
                .catch(next);
                break;
            case 'restore':
                ProductWomen.restore({_id:{$in:req.body.productIds}})
                .then(()=>{
                    res.redirect('back')
                })
                .catch(next);
                break;
            case 'deleteForce':
                ProductWomen.deleteMany({_id:{$in:req.body.productIds}})
                .then(()=>{
                    res.redirect('back')
                })
                .catch(next);
                break;
            case 'default':
                res.send('Submit invalid');
        }
    }
}
module.exports=new ProductController;