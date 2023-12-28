import { Schema } from "mongoose";

export let productSchema = Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  imageUrl:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required:true
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
  }
});
