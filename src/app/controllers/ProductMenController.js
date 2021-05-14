//sử dụng models
const ProductMen=require('../models/ProductMen');

//cài đặt middleware xử lý dữ liệu khi kết nối với mongodb
const {mutipleMongooseToObject,mongooseToObject}=require('../../util/mongoose');
 class ProductMenController {
     create(req,res,next){
        res.render('productsMen/create');
     }

     store(req,res,next){
         req.body.sale=req.body.sale=='true'?true:false;
         req.body.pricereal=Number(req.body.pricereal);
         if(req.body.sale){
            req.body.pricesale=Number(req.body.pricesale);
         }
         else{
            req.body.pricesale=Number(req.body.pricereal);
         }
         req.body.image="img/productsMen/"+req.file.filename;
         const productMen=new ProductMen(req.body);
         productMen.save()
         .then(()=>{
            res.redirect('/me/stored/productsMen');
         })
         .catch(next);

     }

     show(req,res,next){
         ProductMen.findOne({slug:req.params.slug})
        .then((ProductMen)=>{
                ProductMen=mongooseToObject(ProductMen);
                res.render('productsMen/show',{
                    ProductMen
                })
        })
     }
     update(req,res,next){
        ProductMen.updateOne({_id:req.params.id},req.body)
          .then(()=>{
             res.redirect("/me/stored/productsMen");
         })
          .catch(next);
     }
    
     //Lấy phần tử cần update
     get(req,res,next){
          ProductMen.findOne({_id:req.params.id})
        .then((ProductMen)=>{
            ProductMen=mongooseToObject(ProductMen);
            res.render("productsMen/edit",{ProductMen});
        })
        .catch(next);
     }

     //xóa mềm

     //[DELETE] ProductsMen/:id?_method=DELETEy

     destroy(req,res,next){
         console.log(ProductMen.findOne({_id:req.params.id}));
        ProductMen.delete({_id: req.params.id})
       
        .then(()=>{
           res.redirect("back");
        })
        .catch(next);
     }


   //Xử lý sự kiện handle format
   handleForm(req,res,next){
      switch(req.body.action){
         case 'delete':
            ProductMen.delete({_id:{$in:req.body.productIds}})
            .then(()=>{
               res.redirect("back");
            })
            .catch(next);
            break;
            
         case "default":
            res.send('Submit invalid');

      }
   }

   restore(req,res,next){
      ProductMen.restore({_id:req.params.id})
      .then(()=>{
         res.redirect("back");
      })
      .catch(next);
   }

   deleteForce(req,res,next){
      ProductMen.deleteOne({_id:req.params.id})
      .then(()=>{
         res.redirect('back');
      })
      .catch(next);
   }

 }
module.exports=new ProductMenController;