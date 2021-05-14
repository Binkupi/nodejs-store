//Chưa sử dụng ///Không biết làm !!!!
//cài đặt thư viện cài ảnh lên cloud
const cloudinary = require('cloudinary') 
const upload = require('../handlers/upload.multer') 

// Setup Cloudinary
cloudinary.config({
    cloud_name:drdnwmjej,
    api_key: 621917674615987,
    api_secret: Pd5sXkyYum8A-KriHZITzS2fM3U
})
module.exports=cloudinary;