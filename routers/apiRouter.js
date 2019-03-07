import express from "express";
import routes from "../routes";
import { postLike, postDownload } from "../controllers/photoController";

const apiRouter = express.Router();

apiRouter.post(routes.like, postLike);
apiRouter.post(routes.download, postDownload);
export default apiRouter;
