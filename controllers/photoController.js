import routes from "../routes";
import Photo from "../models/Photo";

export const home = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ _id: -1 });
    res.render("home", { page: "Home", photos });
  } catch (e) {
    console.log(e);
    res.render("home", { page: "Home", photos: [] });
  }
};

export const search = (req, res) => res.render("search", { page: "Search" });

export const photoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const photo = await Photo.findById(id);
    res.render("photoDetail", { page: "PhotoDetail", photo });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getUploadPhoto = (req, res) =>
  res.render("uploadPhoto", { page: "Upload Photo" });
export const postUploadPhoto = async (req, res) => {
  const {
    body: { title },
    file: { path }
  } = req;

  const newPhoto = await Photo.create({
    fileUrl: path,
    title
  });

  res.redirect(routes.photoDetail(newPhoto.id));
};

export const getEditPhoto = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const photo = await Photo.findById(id);
    res.render("editPhoto", { page: "Edit Photo", photo });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};
export const postEditPhoto = async (req, res) => {
  const {
    body: { title },
    params: { id }
  } = req;

  try {
    await Photo.findByIdAndUpdate(id, { title });
    res.redirect(routes.photoDetail(id));
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const deletePhoto = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Photo.findByIdAndDelete(id); // 작성자 확인 후
    res.redirect(routes.home); // 이전 페이지로 돌아가야지.
  } catch (e) {
    console.log(e);
    res.redirect(routes.home); // 실패 메세지 띄워야 함
  }
};
