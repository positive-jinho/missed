const input = document.getElementById("avatarFile");
const img = document.getElementById("profile");

function update(e) {
  const reader = new FileReader();

  reader.onload = function(event) {
    img.src = event.target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
}

function init() {
  input.addEventListener("change", update);
}

if (input) {
  init();
}
