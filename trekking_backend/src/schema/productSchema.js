import { Schema } from "mongoose";

export let productSchema = Schema({
  heading: {
    type: String,
    required: true
  },

  imageUrl:{
    type:String,
    required: true
  },
  price:{
    type:String,
    required:true
  },
  duration:{
    type:Number,
    required:true
  },
  season:{
    type:String,
    required:true
  },
  

  category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true,
  }
});
