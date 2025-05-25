// import mongoose from "mongoose";

//   const promptSchema=new mongoose.Schema({
//     role:{
//     type:String,
//     enum:["user","assistent"],
//     required:true,
//     },
//     content:{
//         type:String,
//         required:true
//     },
//     createdAt:{
//     type:Date,
//     default:Date.now
//     }
// })
// export const Prompt =mongoose.model("Prompt",promptSchema)



import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  // uerId:{
  //   type:mongoose.Schema.ObjectId,
  //   ref:"User",
  //   required:true
  // },
  role: {
    type: String,
    enum: ["user", "assistant"], // Fixed typo: "assistent" -> "assistant"
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces from the content
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Ensures createdAt can't be modified after creation
  },
});

// Exporting the model
export const Prompt = mongoose.model("Prompt", promptSchema);
