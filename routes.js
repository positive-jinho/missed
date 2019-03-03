// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// User
const USER = "/user";
const PROFILE = "/:id";
const EDIT_PROFILE = "/edit";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Photo
const PHOTO = "/photo";
const PHOTO_DETAIL = "/:id";
const UPLOAD_PHOTO = "/upload";
const EDIT_PHOTO = "/:id/edit";
const DELETE_PHOTO = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  profile: PROFILE,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
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
  uploadPhoto: UPLOAD_PHOTO
};

export default routes;
