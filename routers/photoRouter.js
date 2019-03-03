import express from "express";
import routes from "../routes";
import {
  photoDetail,
  uploadPhoto,
  editPhoto,
  deletePhoto
} from "../controllers/photoController";

const photoRouter = express.Router();

photoRouter.get(routes.uploadPhoto, uploadPhoto);
photoRouter.get(routes.editPhoto, editPhoto);
photoRouter.get(routes.photoDetail(), photoDetail);
photoRouter.get(routes.deletePhoto, deletePhoto);

export default photoRouter;
