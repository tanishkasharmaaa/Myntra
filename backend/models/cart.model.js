const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  forCategory: { type: String, enum: ["kid", "men", "women"], required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  size: { type: [String], required: true },
  arrayOfAllImages: { type: String, required: true }, // First image or array of images
  color: { type: String, required: true },
  discount: { type: String, required: true },
  productID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }, // Reference to the original product
  userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" }, // Reference to the user
  quantity: { type: Number, default: 1 }, // Quantity of the product in the cart
  addedDate: { type: Date, default: Date.now } // When the product was added to the cart
}, {
  versionKey: false // To remove the __v field from documents
});

const CartProductsModel = mongoose.model('cart', cartProductSchema);

module.exports = CartProductsModel;
