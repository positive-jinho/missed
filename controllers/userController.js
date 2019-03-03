export const join = (req, res) => res.render("join", { page: "Join" });
export const login = (req, res) => res.render("login", { page: "Login" });
export const logout = (req, res) => res.render("logout", { page: "Logout" });

export const me = (req, res) => res.render("profile", { page: "Profile" });
export const profile = (req, res) => res.render("profile", { page: "Profile" });
export const editProfile = (req, res) =>
  res.render("editProfile", { page: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { page: "Change Password" });
