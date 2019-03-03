import multer from "multer";
import routes from "./routes";

const multerPhoto = multer({ dest: "uploads/photo/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MISSED";
  res.locals.routes = routes;
  res.locals.user = {
    id: 123,
    name: "장진호",
    bio: "🚀🚀🚀🚀",
    avatar: "https://avatars0.githubusercontent.com/u/45239217?s=460&v=4",
    authentication: true
  };

  next();
};

export const multerUploadPhoto = multerPhoto.single("photoFile");
