const express=require('express');
const meController=require('../app/controllers/MeController');
const homeController=require('../app/controllers/HomeController');
const router=express.Router();

//Chuyển hướng đến trang lưu sản phẩm của tôi
router.get('/stored/productsWomen',meController.storedProductsWomen);
router.get('/stored/productsMen',meController.storedProductsMen);

//Chuyển hướng đến trang lưu sản phẩm đã xóa mềm
router.get('/trash/productsWomen',meController.trashProductsWomen);
router.get('/trash/productsMen',meController.trashProductsMen);
module.exports=router;