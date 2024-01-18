import { model } from "mongoose";





import { adminSchema } from "./adminSchema.js";

import { inquirySchema } from "./inquirySchema.js";
import { productSchema } from "./productSchema.js";
import { contactSchema } from "./contactSchema.js";
import { aboutSchema } from "./aboutSchema.js";
import categorySchema from "./categorySchema.js";
import { bookingSchema } from "./booking.js";

export let Booking = model('Booking',bookingSchema)
export let Category = model('Catgory',categorySchema)
export let About = model("About",aboutSchema)
export let Contact = model("Contact",contactSchema)
export let Product = model("Product",productSchema)
export let Inquiry = model("Inquiry",inquirySchema)
export let Admin = model("Admin", adminSchema);

