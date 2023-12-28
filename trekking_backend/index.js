import express, { json } from "express";
import { connectDb } from "./src/connectdb/connectdb.js";
import { studentRouter } from "./src/Routes/studentRouter.js";
import { teacherRouter } from "./src/Routes/teacherRouter.js";
import attendanceRouter from "./src/Routes/attendanceRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import cors from "cors";
import { errorMiddleware } from "./src/helper/errorMiddleware.js";
import { PORT } from "./src/config/constant.js";
import { helperRouter } from "./src/Routes/helperRouter.js";
import { removeExpiredToken } from "./src/utils/token.js";
import { dateNow } from "./src/utils/Date.js";
import { aboutRouter } from "./src/Routes/aboutRouter.js";
import expressAsyncHandler from "express-async-handler";
import { successResponse } from "./src/helper/successResponse.js";

let app = new express();
connectDb();
// removeExpiredToken()

app.use(cors());
app.use(json());
// app.use((req,res,next)=>{
//   console.log("Request Received:"+req.method+" "+req.url)
//   next()
// })


app.get("/",expressAsyncHandler(
    async (req, res, next) => {
     console.log(req.body,",,,,,,,,,,,,,,,,,,,")
  
      let response = {
        res,
        result: { id: teacherId },
        message: "Password Changed Successfully",
        statusCode: HttpStatus.OK,
      };
  
      successResponse(response);
    }
  ))

// app.use("/", helperRouter);
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
