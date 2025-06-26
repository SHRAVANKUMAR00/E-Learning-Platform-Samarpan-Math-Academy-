 import mongoose from "mongoose";

 const schema= new mongoose.Schema({

    title:{
        type: String,
        required :true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    createBy:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now, 
    }


 });

 export const Courses=mongoose.model("Courses",schema);