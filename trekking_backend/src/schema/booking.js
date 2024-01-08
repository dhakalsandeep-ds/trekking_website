import { Schema } from "mongoose";

export let bookingSchema = Schema({
  name: {
    type: String,
    required: true
  },
  numberOfPeople:{
     type: Number,
     required: true
  },
  contactNumber:{
    type:Number,
    required: true
  },
  arrivalDate:{
    type:String,
    required:true
  },
  packageName:{
    type:String,
    required:true
  }
 
});
