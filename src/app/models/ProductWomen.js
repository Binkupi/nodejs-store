const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Thư viện xóa mềm 
var mongooseDelete = require('mongoose-delete');

//thư viện tạo số thứ tự slug trùng
const slug=require('mongoose-slug-generator');

const ProductWomen = new Schema({
  name: {type:String},
  sale:{type:Boolean},
  pricereal: {type:Number},
  pricesale:{type:Number},
  image: {type:String},
  catagory:{type:String,required:true},
  detail:{type:String},
  slug: { type: String, slug: 'name',unique:true },
}
);
//add plugin
//Plugin render ra slug
mongoose.plugin(slug);
//Plugin xóa mềm
ProductWomen.plugin(mongooseDelete,{ 
  deletedAt:true,
  overrideMethods: 'all' });

module.exports=mongoose.model('ProductWomen',ProductWomen);