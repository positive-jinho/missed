import express from "express";
import routes from "../routes";
import { postLike, postDownload } from "../controllers/photoController";
import { deleteProfile } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.like, postLike);
apiRouter.post(routes.download, postDownload);
apiRouter.post(routes.deleteProfile, deleteProfile);

export default apiRouter;
