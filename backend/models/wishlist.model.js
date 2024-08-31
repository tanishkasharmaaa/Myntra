const mongoose=require("mongoose");
const wishlistProductSchema=mongoose.Schema({
    name: { type: String },
    category: { type: String },
    forCategory: { type: String, enum: ["kid", "men", "women"], required: true }, // dynamic reference collection name
    price: { type: Number },
    brand: { type: String },
    size: { type: [String] },
    arrayOfAllImages: { type: String },
    color: { type: String },
    discount: { type: String },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'forCategory', // dynamically reference based on 'forCategory'
      required: true,
    },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
  },{
    versionKey:false
})

const WishlistProductsModel=mongoose.model('wishlist',wishlistProductSchema);

module.exports=WishlistProductsModel