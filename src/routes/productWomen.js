const express=require('express');
const ProductWomenController=require('../app/controllers/ProductWomenController');
const router=express.Router();

//Sử dụng cofig multer
const cloudinary = require('cloudinary') 
const uploadMulter = require('../config/file/uploadMulter') 

//[GET] /products/create
router.get('/create',ProductWomenController.create);

router.get('/:id/edit',ProductWomenController.get);

//[POST] /product/store
//uploadMulterSingle: upload 1 file 
router.post('/store',uploadMulter.single('image'),ProductWomenController.store);

//Xử lý sự kiện khi chọn các option trên checkbox
router.post('/handle-form-actions',ProductWomenController.handleForm);

//[GET] /products/:slug
router.get('/:slug',ProductWomenController.show);


//khôi phục sản phẩm đã bị xóa mềm
router.patch('/:id/restore',ProductWomenController.restore);

//Xóa vĩnh viễn sản phẩm
router.delete('/:id/force',ProductWomenController.removeForce);

//[PUT] /products/:id
router.put('/:id',ProductWomenController.update);


//Xóa có thể khôi phục được
//[DELETE] /products/:id
router.delete('/:id',ProductWomenController.destroy);


module.exports=router;