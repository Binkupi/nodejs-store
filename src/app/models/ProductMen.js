 const mongoose=require('mongoose'); 
  const Schema  = mongoose.Schema;
  const ObjectId=Schema.ObjectId;

//thư viện tạo số thứ tự slug trùng
const slug=require('mongoose-slug-generator');

//Thư viện xóa mềm 
var mongooseDelete = require('mongoose-delete');

//tạo đối tượng Productmen
const ProductMen= new Schema({
    name:{type:String,},
    priceReal:{type:Number,},
    sale:{type:Boolean},
    priceSale:{type:Number,},
    image:{type:String},
    catagory:{type:String,required:true},
    detail:{type:String},
    slug: { type: String, slug: 'name',unique:true },

})
//add plugin
//Plugin render ra slug
mongoose.plugin(slug);
//Plugin xóa mềm
ProductMen.plugin(mongooseDelete,{ 
  deletedAt:true,
  overrideMethods: 'all' });

module.exports=mongoose.model('ProductMen',ProductMen);