import passport from "passport";
import User from "../models/User";
import routes from "../routes";
import { setGrid } from "../utils";

import NodeMailer from "nodemailer";
import SendGrid from "nodemailer-sendgrid-transport";
import RandomKey from "randomkey";

export const getJoin = (req, res) => res.render("join", { page: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400);
    res.render("join");
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);

      next();
    } catch (e) {
      console.log(e);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", { page: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: { type: "info", message: "😊 어서오세요 !" },
  failureFlash: "Can't log in. Check email and/or password"
});

export const logout = (req, res) => {
  req.logout();
  req.flash("info", "안녕히가세요! 👋");
  res.redirect(routes.home);
};

export const profile = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findById(id).populate("photos");

    res.render("profile", {
      page: "Profile",
      user,
      photos: await setGrid(user.photos)
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { page: "Edit Profile" });
export const postEditProfile = async (req, res) => {
  try {
    const {
      file,
      body: { bio }
    } = req;

    await User.findByIdAndUpdate(req.user.id, {
      avatarUrl: file ? file.path : req.user.avatarUrl,
      bio
    });

    res.redirect(routes.profile(req.user.id));
  } catch (e) {
    console.log(e);
    res.status(400);
    res.render("editProfile", { page: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { page: "Change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 }
  } = req;

  try {
    if (newPassword !== newPassword2) {
      res.status(400);
      res.redirect(routes.user + routes.changePassword);
    }

    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.user + routes.me);
  } catch (e) {
    console.log(e);
    res.redirect(routes.user + routes.changePassword);
  }
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      properties: { profile_image, nickname }
    }
  } = profile;

  try {
    const user = await User.findOne({ kakaoId: id });

    if (user) {
      return done(null, user);
    }

    const newUser = await User.create({
      name: nickname,
      avatarUrl: profile_image,
      kakaoId: id
    });

    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.avatarUrl = null;
    user.save();

    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const getForgotUser = (req, res) =>
  res.render("forgot", { page: "계정 찾기" });

export const postForgotUser = (req, res) => {
  const {
    body: { email }
  } = req;

  const options = {
    auth: {
      api_user: process.env.SENDGRID_USER,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = NodeMailer.createTransport(SendGrid(options));
  const newPassword = RandomKey(6);
  const mail = {
    from: "MISSED <no-reply@missed.com>",
    to: email,
    subject: "🔒 MISSED 새로운 비밀번호입니다.",
    html: `🔑 새 비밀번호는 <b>${newPassword}</b> 입니다.`
  };

  client.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      User.findOne({ email }, (err, user) => {
        if (err) throw err;

        user.setPassword(newPassword, errr => {
          if (errr) console.log(errr);
          else {
            console.log(user);
            user.save(e => {
              if (e) console.log(e);
              else res.redirect(routes.sent);
            });
          }
        });
      });
    }
  });
};

export const sent = (req, res) => {
  res.render("sent", { page: "계정 찾기" });
};

export const getLeave = (req, res) => res.render("leave", { page: "회원탈퇴" });

export const postLeave = async (req, res) => {
  await User.findByIdAndDelete(req.user.id);

  req.flash("info", "감사했습니다 😭");
  res.redirect(routes.home);
};
