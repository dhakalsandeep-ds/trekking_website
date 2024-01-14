import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";
import { studentRouter } from "./src/Routes/studentRouter.js";
import { teacherRouter } from "./src/Routes/teacherRouter.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";
import { errorMiddleware } from "./src/helper/errorMiddleware.js";
import { HttpStatus, PORT } from "./src/config/constant.js";
import { helperRouter } from "./src/Routes/helperRouter.js";
import { removeExpiredToken } from "./src/utils/token.js";
import { dateNow } from "./src/utils/Date.js";
import { aboutRouter } from "./src/Routes/aboutRouter.js";
import expressAsyncHandler from "express-async-handler";
import { successResponse } from "./src/helper/successResponse.js";
import { About, Admin, Booking, Category, Contact, Inquiry, Product } from "./src/schema/model.js";
import  mongoose  from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

let app = new express();
connectDb();
// removeExpiredToken()

app.use(cors());
app.use(bodyParser.json())

let jwtSecret ='mysecret'

function authMiddleware(req,res,next){
  
  const token = req.header('x-auth-token')
  console.log(token,"inside auth middleware")
  if(!token){
    return res.status(401).json({msg:"No token,authroization denied"})
  }
  try {
    console.log(jwtSecret,"secret,,,,,,,,,,,,,,,,,")
    const decoded= jwt.verify(token,jwtSecret)
    console.log(decoded,".......decoded.......")
    req.user = decoded.user
    next()
  }catch(err){
    console.log(err,"...... err ....")
    res.status(401).json({msg:"Token is not valid"})
  }
}
 
app.post('/register',async (req,res)=>{
  
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new Admin instance
    admin = new Admin({ email, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Save the new Admin
    await admin.save();

    // Create and return a JWT for the registered user
    const payload = {
      user: {
        id: admin.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ email:email,token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

app.post('/login', async (req, res) => {
  // console.log(req,".........")
  const { email, password } = req.body;
  console.log(req.body)
  console.log(email,password,">.....<")
  try {
    // Check if the email is registered
    let admin = await Admin.findOne({ email });
    console.log(admin,"from login admin")
    if (admin === null) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

  
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({sucess:"match", message: 'Invalid credentials' });
    }

    // Create and return a JWT for the logged-in user
    const payload = {
      user: {
        id: admin._id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 24 * 60 * 60 }, (err, token) => {
      if (err) throw err;
      res.json({ user:{email:admin.email,id:admin._id},token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




app.get('/user',authMiddleware,async (req,res)=>{
  try{
    const admin = await Admin.findById(req.user.id).select('-password')
    console.log(admin,"form user get")
    res.status(200).json({data:admin})
  }catch(err){
    res.status(500).send({message:'server error'})
  }
})


// app.use((req,res,next)=>{
//   console.log("Request Received:"+req.method+" "+req.url)
//   next()
// })
// app.get("/about",expressAsyncHandler(
//   async (req, res, next) => {
   
//     var ans
//    console.log(req.body,",,,,,,,,,,,,,,,,,,,")
//    About.find().then(docus => {
    
//     console.log(docus,"..............................")
//     res.status(200).json({
//       result:docus,
//       success: true,
//       mesage:"goal all",
      
//     });
//    })

 

//     // let response = {
//     //   res,
//     //   result: { id: ans },
//     //   message: "Password Changed Successfully",
//     //   statusCode: HttpStatus.OK,
//     // };

//     // successResponse(response);
//   }
// ))

// app.post("/about",expressAsyncHandler(
//     async (req, res, next) => {
//      console.log(req.body,",,,,,,,,,,,,,,,,,,,")
//     //  const query = new mongoose.ObjectId(req.params.id)
//     //   const about = new About({
//     //     "about":req.body.data
//     //   })
//     //   about.save().catch(err=>console.log("eroro")).then(doc=>console.log(doc))

//     const updateDocument = await About.findOneAndUpdate({
//       _id:
//     })
//       let response = {
//         res,
//         result: { id: teacherId },
//         message: "Password Changed Successfully",
//         statusCode: HttpStatus.OK,
//       };
  
//       successResponse(response);
//     }
//   ))

// app.use("/", helperRouter);

// app.get("/about",expressAsyncHandler(
//   async (req, res, next) => {
   
//     var ans
//    console.log(req.body,",,,,,,,,,,,,,,,,,,,")
//    About.find().then(docus => {
    
//     console.log(docus,"..............................")
//     res.status(200).json({
//       result:docus,
//       success: true,
//       mesage:"goal all",
      
//     });
//    })

app.post("/contact", async (req,res) => {
     console.log(req.body,"....................")
     const {email,contact,location} = req.body
     
     try {
      // Check if there is an existing document
      const existingContact = await Contact.findOne();
  
      if (existingContact) {
        // If exists, update the existing document
        await Contact.updateOne({}, {email:email,phoneNumber:parseInt(contact),address:location});
        res.status(200).send({message:"updated sucessfully"});
      } else {
        // If not exists, create a new document
        await Contact.create({email:email,phoneNumber:parseInt(contact),address:location});
        res.status(201).send({message:"created sucesfully"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({sucess:false,message:"internal server error"})
    }

         
    //  res.status(200).send({data:"sucess"})
})

app.get("/contact",async (req,res)=>{
   try{
    const contact = await Contact.findOne().select('-_id -__v')
    if(!contact){
      return res.status(404).json({sucess:false,message:"contact info does not exist"})
    }
    res.status(200).json(contact)
   }catch(e){
         console.log(e)
         res.status(500).json({sucess:false,message:"Internal Server Error"})
   }
})


app.post('/inquiry', async (req, res) => {
  try {
    const { name, email, contactNumber, message } = req.body;

    // Create a new inquiry
    const newInquiry = new Inquiry({
      name,
      email,
      contactNumber:parseInt(contactNumber),
      message,
    });

    // Save the inquiry to the database
    await newInquiry.save();

    res.status(201).json({ sucess:true, message: 'Inquiry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false,error: 'Internal Server Error' });
  }
});

app.get('/inquiry', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json({sucess:true,data:inquiries});
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess:false,message: 'Internal Server Error' });
  }
});

app.get('/inquiry/:id', async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.status(200).json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/inquiry/:id', async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const deletedInquiry = await Inquiry.findByIdAndDelete(inquiryId);

    if (!deletedInquiry) {
      return res.status(404).json({ sucess:false,message: 'Inquiry not found' });
    }

    res.status(200).json({sucess:true, message: 'Inquiry deleted successfully', inquiry: deletedInquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess:false,message: 'Internal Server Error' });
  }
});

app.post('/inquiry/toggleSeen/:id', async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({sucess:false, message: 'Inquiry not found' });
    }

    // Toggle the 'seen' value
    inquiry.seen = !inquiry.seen;

    // Save the updated inquiry
    await inquiry.save();

    res.status(202).json({ sucess:true,message: 'Seen value toggled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess:false,message: 'Internal Server Error' });
  }
});

// category
app.post('/category',async (req,res)=>{
  try {
      const category = new Category(req.body)
      await category.save()
      res.status(202).json({sucess:true,data:category})
  }catch(error){
    console.log('error....')
    res.status(500).json({sucess:true,message:error.message})
  }
})

app.get("/category", async (req,res)=>{
  try{
     const categories = await Category.find()
     res.status(200).json({sucess:true,data:categories})
  } catch(error) {
     res.status(500).json({sucess:false,message:error.message})
  }
})

app.delete("/category/:categoryId",async (req,res)=>{
  try{
    await Category.findByIdAndDelete(req.params.categoryId);
    await Product.deleteMany({category:req.params.categoryId})
    res.status().json({sucess:true,message:"category and associated products deleted sucessfully"})
  }catch (error){
    res.status(500).json({sucess:false,message:error.message})
  }
})

app.post('/category/:categoryId', async (req, res) => {
  try {
      const updatedCategory = await Category.findByIdAndUpdate(
          req.params.categoryId,
          req.body,
          { new: true, runValidators: true }
      );

      if (!updatedCategory) {
          return res.status(404).json({ sucess:false,message: 'Category not found' });
      }

      res.json({sucess:true,data:updatedCategory,message:"edited sucessfully"});
  } catch (error) {
      res.status(500).json({ sucess:false,message: error.message });
  }
});


// product 
app.post('/product/add', async (req, res) => {
  try {
      const { category, ...productData } = req.body;
      console.log(req.body,"body...")
      const product = new Product({ category: category, ...productData });
      await product.save();
      res.json({data:product,message:"added"});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/product/category/:categoryId', async (req, res) => {
  try {
      const products = await Product.find({ category: req.params.categoryId });
      res.json({data:products,message:"fetched all data"});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.delete('/product/:productId', async (req, res) => {
  try {
      await Product.findByIdAndDelete(req.params.productId);
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.put('/product/:productId', async (req, res) => {
  try {
      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.productId,
          req.body,
          { new: true, runValidators: true }
      );

      if (!updatedProduct) {

          return res.status(404).json({ message: 'Product not found' });
      }

      res.json({data:updatedProduct});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/product/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// booking 
app.post('/bookings', async (req, res) => {
  console.log("inside bookings")
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json({message:"created sucessfully",data:newBooking});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({message:"got all",data:bookings});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.json({message:"getted ",data:booking});
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.patch('/bookings/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({mesage:"updated ",data:updatedBooking});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/bookings/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/admin", adminRouter);

app.use(express.static("./public"));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`app is listening at port number ${PORT}`);
  console.log(`http://localhost:${PORT}/`);
});
