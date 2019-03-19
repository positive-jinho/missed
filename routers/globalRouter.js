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
  postKakaoLogin,
  getForgotUser,
  postForgotUser,
  sent
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
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    successFlash: { type: "info", message: "😊 어서오세요 !" },
    failureFlash: "지금은 로그인 할 수 없습니다."
  }),
  postKakaoLogin
);

globalRouter.get(routes.forgot, getForgotUser);
globalRouter.post(routes.forgot, postForgotUser);

globalRouter.get(routes.sent, sent);

export default globalRouter;
