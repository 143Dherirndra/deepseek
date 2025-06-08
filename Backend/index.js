// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import userRoutes from './routes/user.route.js'
// import promptRoutes from './routes/prompt.route.js'
// import cors from 'cors'
// dotenv.config();
// const app = express();
// const port = process.env.PORT || 4001;

// // mongoose db code here!!!!
// const MONGO_URL = process.env.MONGO_URL;
// // middleware
// app.use(express.json());
// app.use(cookieParser())
// app.use(
//   cors({
//      origin: 'https://deepseek-qkon.onrender.com',
//     credentials:true,
//     methode:["GET","POST","PUT","DELETE"],
//     allowedHeaders:["Content-Type","Authorization"]

//   })
// )

// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("connectecd to mongoose"))
//   .catch((error) => console.error("connection to failed to mongoose", error));
// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })


// // routes
// app.use("/api/v1/user",userRoutes)
// // app.use("/api/v1/deepseekai",promptRoutes)


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// app.get("/",(req,res)=>{
//   res.send("Cohdfkh")
// })



import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://deepseek-qkon.onrender.com',
  credentials: true,
}));

// Database Connection
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use("https://deepseekai-oi1b.onrender.com/api/v1/user", userRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
