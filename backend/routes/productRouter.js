const mongoose=require("mongoose");
const express=require("express");
const jwt=require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");
const ProductRouter=express.Router();
const MenProductsModel=require("../models/menProduct.model");
const WomenProductsModel = require("../models/womenProduct.model");
const KidProductsModel = require("../models/kidProduct.model");
const WishlistProductsModel = require("../models/wishlist.model");
const authMiddleware = require("../middleware/authMiddlware");

ProductRouter.use(express.json());

// -------------- MEN POST ROUTE ------------------ //

ProductRouter.post('/men/create',adminMiddleware,async(req,res)=>{
  try {
    let product=new MenProductsModel(req.body);
    await product.save();
    res.status(201).json({message:"Product created successfully"})
 
  } catch (error) {
    res.status(500).json({error})
  }
})

// -------------- WOMEN POST ROUTE ------------------ //

ProductRouter.post('/women/create',adminMiddleware,async(req,res)=>{
  try {
    let product=new WomenProductsModel(req.body);
    await product.save();
    res.status(201).json({message:"Product created successfully"})
 
  } catch (error) {
    res.status(500).json({error})
  }
})

// -------------- KID POST ROUTE ------------------ //

ProductRouter.post('/kid/create',adminMiddleware,async(req,res)=>{
  try {
    let product=new KidProductsModel(req.body);
    await product.save();
    res.status(201).json({message:"Product created successfully"})
 
  } catch (error) {
    res.status(500).json({error})
  }
})

//-----------------------------UPDATE-----------------------------

ProductRouter.patch('/:id',async(req,res)=>{
  try {
    let updateProduct;
    
   let men=await MenProductsModel.findByIdAndUpdate({_id:req.params.id},req.body);
    let women=await WomenProductsModel.findByIdAndUpdate({_id:req.params.id},req.body);
    let kid=await KidProductsModel.findByIdAndUpdate({_id:req.params.id},req.body);
    console.log(updateProduct)
   if(men){
    await men.save()
   }
   else if(women){
    await women.save()
   }
   else if(kid){
await kid.save()
   }
  
    res.status(200).json({message:"Product Updated Successfully"})
  } catch (error) {
   res.status(500).json({error}) 
  }
})


ProductRouter.delete('/:id',async(req,res)=>{
  try {
    let men=await MenProductsModel.findByIdAndDelete({_id:req.params.id});
    let women=await WomenProductsModel.findByIdAndDelete({_id:req.params.id});
    let kid=await KidProductsModel.findByIdAndDelete({_id:req.params.id});
    if(men){
      await men.save()
    }
    else if(women){
      await women.save()
    }
    else if(kid){
await kid.save()
    }

 res.status(200).json({message:"Product Deleted Successfully"})
  } catch (error) {
    res.status(500).json({error}) 
  }
})


///---------------------CART-------------------------

ProductRouter.post('/wishlist/:id', authMiddleware, async (req, res) => {
  let token=req.headers.authorization.split(" ")[1];
  let userId;
  jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decode){
if(err){
  res.status(400).json({err})
}
if(decode){
  userId=decode.userID
}
  })
  try {
    // Find the product in the different collections
    let men = await MenProductsModel.findOne({ _id: req.params.id });
    let women = await WomenProductsModel.findOne({ _id: req.params.id });
    let kid = await KidProductsModel.findOne({ _id: req.params.id });

    let productToAdd;

    // Check each collection and assign product details
    if (men) {
    
      productToAdd = {
        name: men.name,
        category: men.category,
        price: men.price,
        brand: men.brand,
        size: men.size,
        images: men.arrayOfAllImages, // Assuming this field exists in WishlistProductsModel
        color: men.color,
        discount: men.discount,
        userID:userId
      };
    } else if (women) {
      console.log(women.name);
      productToAdd = {
        name: women.name,
        category: women.category,
        price: women.price,
        brand: women.brand,
        size: women.size,
        images: women.arrayOfAllImages,
        color: women.color,
        discount: women.discount,
        userID:userId
      };
    } else if (kid) {
    
      productToAdd = {
        name: kid.name,
        category: kid.category,
        price: kid.price,
        brand: kid.brand,
        size: kid.size,
        images: kid.arrayOfAllImages,
        color: kid.color,
        discount: kid.discount,
        userID:userId
      };
    }

    // If no product was found, return an error
    if (!productToAdd) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new wishlist entry and save
    let output = new WishlistProductsModel(productToAdd);
    await output.save();

    // Send a success response
    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
   
    res.status(500).json({ error });
  }
});

///---------------------------GET PRODUCT------------------------------

ProductRouter.get('/men',async(req,res)=>{
  let{limit=20,page=1}=req.query;
  try {
    limit=parseInt(limit);
    page=parseInt(page)
    let men=await MenProductsModel.find().limit(limit).skip((page-1)*limit).sort({price:1});
    res.status(200).json({men})
  } catch (error) {
    res.status(400).json({error})
  }
})

ProductRouter.get('/women',async(req,res)=>{
  let{limit=20,page=1}=req.query;
  try {
    limit=parseInt(limit);
    page=parseInt(page)
    let women=await WomenProductsModel.find().limit(limit).skip((page-1)*limit).sort({price:1});
    res.status(200).json({women})
  } catch (error) {
    res.status(400).json({error})
  }
})

ProductRouter.get('/kid',async(req,res)=>{
  let{limit=20,page=1}=req.query
  try {
    limit=parseInt(limit);
    page=parseInt(page)
    let kid=await KidProductsModel.find().limit(limit).skip((page-1)*limit).sort({price:1});
    res.status(200).json({kid})
  } catch (error) {
    res.status(400).json({error})
  }
})

//------------------GET ALL PRODUCTS-------------------

ProductRouter.get('/all_Product', async (req, res) => {
  let { q, name, category,forCategory,price, brand, limit = 20, page = 1 } = req.query;

  try {
    // Convert limit and page to integers for pagination
    limit = parseInt(limit);
    page = parseInt(page);

    // Initialize filter object
    let filter = {};

    // Apply dynamic search for 'q' across the 'name' field
    if (q) {
   
     filter.$or=[
{name:new RegExp(q,'i')},
{category:new RegExp(q,'i')},
{forCategory:new RegExp(q,'i')},
{brand:new RegExp(q,'i')},


     ]
     const parsedNumber = parseFloat(q);
     if (!isNaN(parsedNumber)) {
       filter.$or.push({ price: parsedNumber });  // Exact match for numeric 'price'
     }
    } else {
      // Apply specific filters if individual parameters are provided
      if (name) {
        filter.name = new RegExp(name, 'i'); // Case-insensitive partial match for 'name'
      }
      if (category) {
        filter.category = category;
      }
      if(forCategory){
        filter.forCategory = forCategory;
      }
      if (brand) {
        filter.brand = brand;
      }
    }

    // Fetch products from all collections with filters and pagination
    let men = await MenProductsModel.find(filter).limit(limit).skip((page - 1) * limit);
    let women = await WomenProductsModel.find(filter).limit(limit).skip((page - 1) * limit);
    let kid = await KidProductsModel.find(filter).limit(limit).skip((page - 1) * limit);

    // Combine products from all collections
    let allProducts = [...men, ...women, ...kid];

    // Send the combined products with a success response
    res.status(200).json({
      products: allProducts,
      totalProducts: allProducts.length,
      currentPage: page,
      totalPages: Math.ceil(allProducts.length / limit),
    });

  } catch (error) {
    // Send an error response in case of any issues
    res.status(500).json({ error: error.message });
  }
});



module.exports=ProductRouter