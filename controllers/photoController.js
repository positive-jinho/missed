import { photos } from "../db";

export const home = (req, res) => res.render("home", { page: "Home", photos });
export const search = (req, res) =>
  res.render("search", { page: "Search", photos });
export const photoDetail = (req, res) =>
  res.render("photoDetail", { page: "PhotoDetail", photo: photos[0] });
export const uploadPhoto = (req, res) =>
  res.render("uploadPhoto", { page: "Upload Photo" });
export const editPhoto = (req, res) =>
  res.render("editPhoto", { page: "Edit Photo", photo: photos[0] });
export const deletePhoto = (req, res) =>
  res.render("deletePhoto", { page: "Delete Photo" });
