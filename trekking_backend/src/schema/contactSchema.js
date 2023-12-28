import { Schema } from "mongoose";

export let contactSchema = Schema({
  address: {
    type: String,
    required: true
  },
 phoneNumber:{
    type: String,
    required: true
 },
  email:{
    type:String,
    required: true
  }
});
