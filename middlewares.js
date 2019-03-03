import multer from "multer";
import routes from "./routes";

const multerPhoto = multer({ dest: "uploads/photo/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MISSED";
  res.locals.routes = routes;
  res.locals.user = {
    authentication: false
  };

  next();
};

export const multerUploadPhoto = multerPhoto.single("photoFile");
