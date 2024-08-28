const mongoose=require("mongoose");
const express=require("express");
const UserRouter=express.Router();
const UserModel =require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const dotenv=require("dotenv");
dotenv.config();


UserRouter.use(express.json());

UserRouter.post('/signup',async function (req,res){
  
    let{email,role,password,name}=req.body
    try {
     
        let user=await UserModel.findOne({email})
        
        if(user){
           
            res.status(400).json({message:"User exists"})
        }
        else{
          let createUser;
        
        bcrypt.hash(password,6,async function(err,hash){
           if(err){
         
            res.status(400).json({err:err})
           }
           if(hash){
          
createUser=new UserModel({
    name,
    email,
    password:hash,
    role
})

 await createUser.save()
           }
          
         res.status(201).json({message:"User signed up successfully"})
        })   
        }
 } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

// LOGIN

UserRouter.post('/login',async function(req,res){
    let{email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(!user){
            res.status(400).json({message:"Invalid credentials"})
        }
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
res.status(400).json({err})
            }
            if(result){
              let accessToken=  jwt.sign({userID:user._id,role:user.role,email},process.env.JWT_SECRET_KEY,{algorithm:"HS256"});
            res.status(200).json({message:"Login successful",accessToken})
            }
            else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
})


module.exports=UserRouter