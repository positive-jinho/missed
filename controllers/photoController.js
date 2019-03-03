export const home = (req, res) => res.render("home", { page: "Home" });
export const search = (req, res) => res.render("search", { page: "Search" });
export const photoDetail = (req, res) =>
  res.render("photoDetail", { page: "PhotoDetail" });
export const uploadPhoto = (req, res) =>
  res.render("uploadPhoto", { page: "Upload Photo" });
export const editPhoto = (req, res) =>
  res.render("editPhoto", { page: "Edit Photo" });
export const deletePhoto = (req, res) =>
  res.render("deletePhoto", { page: "Delete Photo" });
