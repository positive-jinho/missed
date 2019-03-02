import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "글쓰깃";
  res.locals.routes = routes;

  next();
};
