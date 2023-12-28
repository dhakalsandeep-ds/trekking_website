import { Schema } from "mongoose";

export let inquirySchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber:{
    type:Number,
    required: true
  }
});
