import expressAsyncHandler from "express-async-handler";
import { Attendance, Batch, Teacher } from "../schema/model.js";
import { comparePassword, hashPassword } from "../utils/Hashing.js";
import { HttpStatus } from "../config/constant.js";
import { successResponse } from "../helper/successResponse.js";



export let updateAbout = expressAsyncHandler(
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
  );