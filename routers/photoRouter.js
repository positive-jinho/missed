import express from "express";
import routes from "../routes";
import {
  photoDetail,
  getUploadPhoto,
  getEditPhoto,
  postEditPhoto,
  deletePhoto,
  postUploadPhoto
} from "../controllers/photoController";
import { multerUploadPhoto } from "../middlewares";

const photoRouter = express.Router();

photoRouter.get(routes.uploadPhoto, getUploadPhoto);
photoRouter.post(routes.uploadPhoto, multerUploadPhoto, postUploadPhoto);

photoRouter.get(routes.editPhoto(), getEditPhoto);
photoRouter.post(routes.editPhoto(), postEditPhoto);

photoRouter.get(routes.photoDetail(), photoDetail);
photoRouter.get(routes.deletePhoto(), deletePhoto);

export default photoRouter;
