const input = document.getElementById("avatarFile");
const img = document.getElementById("profile");
const deleteBtn = document.getElementById("profile-delete");

function deleteProfile() {
  fetch(`/api/delete-profile`, {
    method: "POST"
  }).then(() => {
    img.src = "/static/img/profile.jpg";
  });
}

function update(e) {
  const reader = new FileReader();

  reader.onload = function(event) {
    img.src = event.target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
}

function init() {
  input.addEventListener("change", update);
  deleteBtn.addEventListener("click", deleteProfile);
}

if (input) {
  init();
}
