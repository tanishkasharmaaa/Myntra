const mongoose=require("mongoose");
const beautyProductSchema=mongoose.Schema({
name:{type:String,required:true},
category:{type:String,required:true},
forCategory:{type:String,required:true},
price:{type:Number,required:true},
brand:{type:String,required:true},
arrayOfAllImages:{type:[String],required:true},
discount:{type:String},
})

const BeautyProductsModel=mongoose.model('beauty',beautyProductSchema);

module.exports=BeautyProductsModel