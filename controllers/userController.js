import passport from "passport";
import User from "../models/User";
import routes from "../routes";
import { setGrid } from "../utils";

export const getJoin = (req, res) => res.render("join", { page: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
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
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
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
      photos: setGrid(user.photos)
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

    res.redirect(routes.user + routes.me);
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
