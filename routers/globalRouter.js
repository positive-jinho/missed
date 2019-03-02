import express from "express";
import routes from "../routes";
import { home, upload } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.upload, upload);

export default globalRouter;
