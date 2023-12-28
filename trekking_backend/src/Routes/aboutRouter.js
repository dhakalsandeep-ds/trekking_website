import { Router } from "express";
import { updateAbout } from "../controllers/aboutController.js";

export let aboutRouter = Router();
// teacherRouter.route("/login").post(loginTeacher)
// teacherRouter.route("/logout").get(isAuthenticated,isAuthorizedTeacher,logoutTeacher)
aboutRouter.route("/").post(updateAbout)
  
