// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

const KAKAO_LOGIN = "/kakao";
const KAKAO_CALLBACK = "/oauth";

// User
const USER = "/user";
const PROFILE = "/:id";
const EDIT_PROFILE = "/edit";
const CHANGE_PASSWORD = "/change-password";
const LEAVE = "/leave";

// Photo
const PHOTO = "/photo";
const PHOTO_DETAIL = "/:id";
const UPLOAD_PHOTO = "/upload";
const EDIT_PHOTO = "/:id/edit";
const DELETE_PHOTO = "/:id/delete";

// API
const API = "/api";
const LIKE = "/:id/like";
const DOWNLOAD = "/:id/download";
const DELETE_PROFILE = "/delete-profile";
const FORGOT = "/forgot";
const SENT = "/sent";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  profile: id => {
    if (id) {
      return `/user/${id}`;
    } else {
      return PROFILE;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  photo: PHOTO,
  photoDetail: id => {
    if (id) {
      return `/photo/${id}`;
    } else {
      return PHOTO_DETAIL;
    }
  },
  editPhoto: id => {
    if (id) {
      return `/photo/${id}/edit`;
    } else {
      return EDIT_PHOTO;
    }
  },
  deletePhoto: id => {
    if (id) {
      return `/photo/${id}/delete`;
    } else {
      return DELETE_PHOTO;
    }
  },
  uploadPhoto: UPLOAD_PHOTO,
  api: API,
  like: LIKE,
  download: DOWNLOAD,
  deleteProfile: DELETE_PROFILE,
  kakaoLogin: KAKAO_LOGIN,
  kakaoCallback: KAKAO_CALLBACK,
  forgot: FORGOT,
  sent: SENT,
  leave: LEAVE
};

export default routes;
