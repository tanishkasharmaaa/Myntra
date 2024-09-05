const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");
const ProductRouter = express.Router();
const MenProductsModel = require("../models/menProduct.model");
const WomenProductsModel = require("../models/womenProduct.model");
const KidProductsModel = require("../models/kidProduct.model");
const WishlistProductsModel = require("../models/wishlist.model");
const authMiddleware = require("../middleware/authMiddlware");
const CartProductsModel = require("../models/cart.model");
const BeautyProductsModel = require("../models/beauty.model");

ProductRouter.use(express.json());

// -------------- MEN POST ROUTE ------------------ //

ProductRouter.post("/men/create", adminMiddleware, async (req, res) => {
  try {
    let product = new MenProductsModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// -------------- WOMEN POST ROUTE ------------------ //

ProductRouter.post("/women/create", adminMiddleware, async (req, res) => {
  try {
    let product = new WomenProductsModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// -------------- KID POST ROUTE ------------------ //

ProductRouter.post("/kid/create", adminMiddleware, async (req, res) => {
  try {
    let product = new KidProductsModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// -------------------------BEAUTY ROUTE ----------------------------//

ProductRouter.post("/beauty/create", adminMiddleware, async (req, res) => {
  try {
    let product = new BeautyProductsModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//-----------------------------UPDATE-----------------------------

ProductRouter.patch("/:id", async (req, res) => {
  try {
    let updateProduct;

    let men = await MenProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    let women = await WomenProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    let kid = await KidProductsModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log(updateProduct);
    if (men) {
      await men.save();
    } else if (women) {
      await women.save();
    } else if (kid) {
      await kid.save();
    }

    res.status(200).json({ message: "Product Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

ProductRouter.delete("/:id", async (req, res) => {
  try {
    let men = await MenProductsModel.findByIdAndDelete({ _id: req.params.id });
    let women = await WomenProductsModel.findByIdAndDelete({
      _id: req.params.id,
    });
    let kid = await KidProductsModel.findByIdAndDelete({ _id: req.params.id });
    if (men) {
      await men.save();
    } else if (women) {
      await women.save();
    } else if (kid) {
      await kid.save();
    }

    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

///---------------------CART-------------------------

ProductRouter.post("/wishlist/:id", authMiddleware, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    userId = decoded.userID;
  } catch (err) {
    return res.status(400).json({ message: "Invalid token", error: err });
  }

  try {
    // Find the product in the different collections
    let product =
      (await MenProductsModel.findOne({ _id: req.params.id })) ||
      (await WomenProductsModel.findOne({ _id: req.params.id })) ||
      (await KidProductsModel.findOne({ _id: req.params.id }));

    // If no product was found, return an error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Determine the correct 'forCategory' based on the found product's model
    let forCategory = "";
    if (product instanceof MenProductsModel) {
      forCategory = "men";
    } else if (product instanceof WomenProductsModel) {
      forCategory = "women";
    } else if (product instanceof KidProductsModel) {
      forCategory = "kid";
    }

    // Create the product object to be added to the wishlist
    let productToAdd = {
      name: product.name,
      category: product.category,
      forCategory: forCategory, // Set dynamically based on the product model
      price: product.price,
      brand: product.brand,
      size: product.size,
      arrayOfAllImages: product.arrayOfAllImages[0], // Assuming it's an array, we take the first image
      color: product.color,
      discount: product.discount,
      productID: product._id, // Add the product's ID
      userID: userId,
    };

    // Save the wishlist entry
    let wishlistEntry = new WishlistProductsModel(productToAdd);
    await wishlistEntry.save();

    // Send a success response
    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

ProductRouter.get("/wishlist", authMiddleware, async (req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  let userId;
  jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
    if(decode){
      userId=decode.userID
    }
  })
  try {
    let wishlist = await WishlistProductsModel.find({userID:userId});
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ error });
  }
});






ProductRouter.delete("/wishlist/:id", authMiddleware, async (req, res) => {
  try {
    // Find and delete the product from the wishlist
    const wishlistProduct = await WishlistProductsModel.findByIdAndDelete(
      req.params.id
    );

    // If the product was not found in the wishlist, return an error
    if (!wishlistProduct) {
      return res
        .status(404)
        .json({ message: "Product not found in the wishlist" });
    }

    // Create the cart product data using the details from the deleted wishlist product
    const cartProductData = {
      name: wishlistProduct.name,
      category: wishlistProduct.category,
      forCategory: wishlistProduct.forCategory,
      price: wishlistProduct.price,
      brand: wishlistProduct.brand,
      size: wishlistProduct.size,
      arrayOfAllImages: wishlistProduct.arrayOfAllImages,
      color: wishlistProduct.color,
      discount: wishlistProduct.discount,
      productID: wishlistProduct.productID,
      userID: wishlistProduct.userID,
      quantity: 1, // Set a default quantity for the cart
      addedDate: Date.now(), // Set the current date for when the product is added to the cart
    };

    // Add the product to the cart
    const cartProduct = new CartProductsModel(cartProductData);
    await cartProduct.save();

    res
      .status(200)
      .json({ message: "Product moved from wishlist to cart successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});




///--------------------ADD TO CART------------------------------------------------------




ProductRouter.post("/add-to-cart/:id", authMiddleware, async (req, res) => {
  let userId;
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decode) {
    if (err) {
      res.status(400).json({ err });
    }
    if (decode) {
      userId = decode.userID;
    }
  });
  try {
    const product =
      (await MenProductsModel.findOne({_id:req.params.id})) ||
      (await WomenProductsModel.findOne({_id:req.params.id})) ||
      (await KidProductsModel.findOne({_id:req.params.id}));

    // If no product was found, return an error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create the cart product data
    const cartProductData = {
      name: product.name,
      category: product.category,
      forCategory: product.forCategory,
      price: product.price,
      brand: product.brand,
      size: product.size,
      arrayOfAllImages: product.arrayOfAllImages[0], 
      color: product.color,
      discount: product.discount,
      productID: product._id,
      userID: userId, 
      quantity: 1, 
      addedDate: Date.now(), 
    };

    // Add the product to the cart
    const cartProduct = new CartProductsModel(cartProductData);
    await cartProduct.save();

    // Send a success response
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cartProduct });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});



//----------------------------ADD TO CART (GET)--------------------------------




ProductRouter.get('/cart', authMiddleware, async (req, res) => {
  let userId;
  let token=req.headers.authorization.split(' ')[1];
  jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
    if(decode){
userId=decode.userID
    }
  })
  try {
    // Find all cart items for the logged-in user
    const cartItems = await CartProductsModel.find({ userID:userId });

    // If no items found, return an empty list
    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({ message: "No items in the cart", cartItems: [] });
    }

    // Send the list of cart items
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});



///---------------------------GET PRODUCT------------------------------

ProductRouter.get("/men", async (req, res) => {
  let { limit = 20, page = 1 } = req.query;
  try {
    limit = parseInt(limit);
    page = parseInt(page);
    let men = await MenProductsModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: 1 });
    res.status(200).json({ men });
  } catch (error) {
    res.status(400).json({ error });
  }
});

ProductRouter.get("/women", async (req, res) => {
  let { limit = 20, page = 1 } = req.query;
  try {
    limit = parseInt(limit);
    page = parseInt(page);
    let women = await WomenProductsModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: 1 });
    res.status(200).json({ women });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//-------------------------------------GET KID------------------------------------------------------------

ProductRouter.get("/kid", async (req, res) => {
  let { limit = 20, page = 1 } = req.query;
  try {
    limit = parseInt(limit);
    page = parseInt(page);
    let kid = await KidProductsModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: 1 });
    res.status(200).json({ kid });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//------------------GET ALL PRODUCTS-------------------

ProductRouter.get("/all_Product", async (req, res) => {
  let {
    id,
    q,
    name,
    category,
    forCategory,
    price,
    color,
    brand,
    limit = 20,
    page = 1,
  } = req.query;

  try {
    limit = parseInt(limit);
    page = parseInt(page);

    let filter = {};

    if (q) {
      filter.$or = [
        { name: new RegExp(q, "i") },
        { category: new RegExp(q, "i") },
        { forCategory: new RegExp(q, "i") },
        { brand: new RegExp(q, "i") },
      ];

      const parsedNumber = parseFloat(q);
      if (!isNaN(parsedNumber)) {
        filter.$or.push({ price: parsedNumber }); // Exact match for numeric 'price'
      }
    }

    if (name) filter.name = new RegExp(name, "i");
    if (category) filter.category = category;
    if (forCategory) filter.forCategory = forCategory;
    if (brand) filter.brand = brand;
    if (color) filter.color = color;
    if (id) filter._id = id;

    let men = await MenProductsModel.find(filter);
    let women = await WomenProductsModel.find(filter);
    let kid = await KidProductsModel.find(filter);

    let allProducts = [...men, ...women, ...kid];

    const totalProducts = allProducts.length;

    const startIndex = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);

    res.status(200).json({
      products: paginatedProducts,
      totalProducts: totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = ProductRouter;
