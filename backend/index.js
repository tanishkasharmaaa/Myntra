const mongoose=require("mongoose");
const express=require("express");
const dotenv=require('dotenv').config()
const PORT=process.env.PORT
const app=express();
const cors=require("cors");
const connection = require("./configs/db");
const UserRouter=require("./routes/userRouter");
const ProductRouter = require("./routes/productRouter");


app.use(cors());

app.use("/user",UserRouter)
app.use("/product",ProductRouter)

app.listen(PORT,async()=>{
try {
    await connection
    console.log(`Server is running ${PORT}`)
} catch (error) {
   console.log(error) 
}
})