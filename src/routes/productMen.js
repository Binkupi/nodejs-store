//Kết nối với expressjs
const express=require('express');
const router=express.Router();
const ProductMenController=require('../app/controllers/ProductMenController');

const uploadMulter = require('../config/file/uploadMulter') 

//chuyển hướng dữ liệu đến form tạo
router.get('/create',ProductMenController.create);
//Post ProductsMen/handle-form-action
router.post('/handle-form-actions',ProductMenController.handleForm);

//PATCH ProductsMen/:id/restore
router.patch('/:id/restore',ProductMenController.restore);
//Xóa vĩnh viễn phần tử khỏi website
router.delete('/:id/force',ProductMenController.deleteForce);

router.get('/:id/edit',ProductMenController.get);
router.put('/:id',ProductMenController.update);
router.get('/:slug',ProductMenController.show);
//submit form tạo
router.post('/store',uploadMulter.single('image'),ProductMenController.store);
router.delete('/:id',ProductMenController.destroy);
module.exports=router;