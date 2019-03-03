import multer from "multer";
import routes from "./routes";

const multerPhoto = multer({ dest: "uploads/photo/" });
const multerAvatar = multer({ dest: "uploads/avatar/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MISSED";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;

  next();
};

export const multerUploadPhoto = multerPhoto.single("photoFile");
export const multerUploadAvatar = multerAvatar.single("avatarFile");
