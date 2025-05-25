// import { User } from "../model/user.model.js";
// import byrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'
// import config  from "../config.js";

// export const signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
  
//   try {
//     const user = await User.findOne({ email:email });  // Await is needed here

//     if (user) {
//       return res.status(401).json({ error: "User already exists" });
//     }

//     const hashPassword=await byrypt.hash(password,10);


//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password:hashPassword
//     });

//     await newUser.save();  // Await the save operation

//     return res.status(201).json({ message: "User signup succeeded" });
//   } catch (error) {
//     console.error("Error in signup:", error);
//     return res.status(500).json({ error: "Error in signup" });
//   }
// };

// export const login = async (req,res)=>{
//   const {email,password}=req.body;
//   try{
//     const user= await User.findOne({email:email})
    
     
//     if(!user){
//       return res.status(403).json({error:"invalid credential"});

//     }
//     const isPassword= await byrypt.compare(password,user.password)

//     if(!isPassword){
//       return res.status(403).json({error:"invalid credential"});

//     }

//     // jwt code here
//     const token= jwt.sign({id:user._id},config.JWT_USER_PASSWORD,{
//       expiresIn:"1d"

//     });
//     const cookieOption={
//       expires:new Date(Date.now() + 24 *60*60* 1000),
//       httpOnly:true,
//       secure:process.env.NODE_ENV==="production",
//       sameSite:"strict"
//     }
//     res.cookie("jwt",token,cookieOption)
//     return res.status(201).json({message:"user in logged In ",user,token});

//   }catch(error){
//     console.log("error in login ",error)
//     return res.status(500).json({errors:"error in login"})
//   }
// };

// export const logout= (req,res)=>{
//   try {
//     res.clearCookie("jwt")
//     return res.status(200).json({message:"logout success"})
    
//   } catch (error) {
//     console.log("error in logout",error);
//     return res.status(500).json({message:"logout success"})
//   }

// }



import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../config.js";

// User Signup
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ error: "User already exists" }); // 409 for conflict
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Error in signup:", error.message || error);
        return res.status(500).json({ error: "An error occurred during signup" });
    }
};

// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, { expiresIn: "2d" });

        const cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        };

        res.cookie("jwt", token, cookieOption);
        return res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
        console.error("Error in login:", error.message || error);
        return res.status(500).json({ error: "An error occurred during login" });
    }
};

// User Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error.message || error);
        return res.status(500).json({ error: "An error occurred during logout" });
    }
};
