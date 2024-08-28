const mongoose=require("mongoose");
const womenProductSchema=mongoose.Schema({
name:{type:String,required:true},
category:{type:String,required:true},
forCategory:{type:String,required:true},
price:{type:Number,required:true},
brand:{type:String,required:true},
size:{type:[String]},
arrayOfAllImages:{type:[String],required:true},
color:{type:String,required:true},
discount:{type:String},
})

const WomenProductsModel=mongoose.model('woman',womenProductSchema);

module.exports=WomenProductsModel