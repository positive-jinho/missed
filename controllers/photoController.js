import routes from "../routes";
import Photo from "../models/Photo";
import Tag from "../models/Tag";
import Like from "../models/Like";
import { setGrid } from "../utils";
import imageSize from "image-size";

export const home = async (req, res) => {
  let photos;

  try {
    photos = await Photo.find()
      .sort({ _id: -1 })
      .populate("creator");
  } catch (e) {
    console.log(e);
  }

  const grid = await setGrid(photos);
  res.render("home", { page: "Home", photos: grid });
};

export const search = async (req, res) => {
  const {
    query: { term }
  } = req;

  let photos = [];

  const removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };

  try {
    const findPhoto = await Photo.find({
      title: { $regex: term, $options: "i" }
    }).populate("creator");
    const findTag = await Tag.find(
      {
        tag: { $regex: term, $options: "i" }
      },
      "photo"
    ).populate({ path: "photo", populate: { path: "creator" } });

    photos = findPhoto;

    findTag.forEach(e => {
      photos.push(e.photo);
    });

    photos = removeDuplicates(photos, "id");
  } catch (e) {
    console.log(e);
  }
  res.render("search", {
    page: "Search",
    photos: await setGrid(photos),
    term
  });
};

export const photoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const photo = await Photo.findById(id).populate("creator");
    photo.views += 1;
    photo.save();

    const tag = await Tag.findOne({ photo: id });
    const like = await Like.find({ photo: id });
    const dimensions = imageSize(photo.fileUrl);

    res.render("photoDetail", {
      page: "PhotoDetail",
      photo,
      tags: tag.tag.split(","),
      likeCnt: like.length,
      dimensions
    });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getUploadPhoto = (req, res) =>
  res.render("uploadPhoto", { page: "Upload Photo" });
export const postUploadPhoto = async (req, res) => {
  const {
    body: { title, tag },
    file: { path }
  } = req;

  const newPhoto = await Photo.create({
    fileUrl: path,
    title,
    creator: req.user.id
  });

  await Tag.create({
    photo: newPhoto.id,
    tag
  });

  req.user.photos.push(newPhoto.id);
  req.user.save();

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

export const postLike = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const like = await Like.findOne({ photo: id, creator: req.user.id });
    if (like === null) {
      await Like.create({ photo: id, creator: req.user.id });
    } else {
      await Like.findByIdAndDelete(like.id);
    }
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDownload = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const photo = await Photo.findById(id);
    photo.downloadCnt += 1;
    photo.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
