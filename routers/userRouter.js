import express from "express";
import routes from "../routes";
import {
  profile,
  getEditProfile,
  getChangePassword,
  postEditProfile,
  postChangePassword,
  getLeave,
  postLeave
} from "../controllers/userController";
import { multerUploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, multerUploadAvatar, postEditProfile);

userRouter.get(routes.leave, getLeave);
userRouter.post(routes.leave, postLeave);

userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.profile(), profile);

export default userRouter;
