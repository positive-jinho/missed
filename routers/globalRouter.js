import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/photoController";
import {
  getJoin,
  postJoin,
  getLogin,
  logout,
  postLogin,
  kakaoLogin,
  postKakaoLogin
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.kakaoLogin, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoLogin
);

export default globalRouter;
