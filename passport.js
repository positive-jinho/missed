import passport from "passport";
import KakakoStrategy from "passport-kakao";
import User from "./models/User";
import { kakaoLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  "kakao",
  new KakakoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: "http://localhost:4000/oauth"
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
