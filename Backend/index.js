import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js'
import promptRoutes from './routes/prompt.route.js'
import cors from 'cors'
dotenv.config();
const app = express();
const port = process.env.PORT || 4001;

// mongoose db code here!!!!
const MONGO_URL = process.env.MONGO_URL;
// middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
     origin: 'https://deepseek-qkon.onrender.com',
    credentials:true,
    methode:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]

  })
)

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connectecd to mongoose"))
  .catch((error) => console.error("connection to failed to mongoose", error));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// routes
app.use("/api/v1/user",userRoutes)
// app.use("/api/v1/deepseekai",promptRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/",(req,res)=>{
  res.send("Cohdfkh")
})
