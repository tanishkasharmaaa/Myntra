const mongoose=require("mongoose");
const wishlistProductSchema=mongoose.Schema({
name:{type:String},
category:{type:String},
forCategory:{type:String},
price:{type:Number},
brand:{type:String},
size:{type:[String]},
arrayOfAllImages:{type:String},
color:{type:String},
discount:{type:String},
userID:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
},{
    versionKey:false
})

const WishlistProductsModel=mongoose.model('wishlist',wishlistProductSchema);

module.exports=WishlistProductsModel