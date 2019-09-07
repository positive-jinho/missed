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
  deleteBtn.addEventListener("click", deleteProfile); // FIXME: 여기 고쳐야 된다. 프로필 이미지 없을 때 콘솔에서 오류남.
}

if (input) {
  init();
}
