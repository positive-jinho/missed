import express from "express";
import routes from "../routes";
import {
  profile,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.profile, profile);

export default userRouter;
