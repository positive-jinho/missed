const input = document.getElementById("photoFile");
const img = document.getElementById("sample");
const label = document.getElementById("upload-label");

function update(e) {
  const reader = new FileReader();

  reader.onload = function(event) {
    img.src = event.target.result;
    img.style.display = "inline";
    label.textContent = "원하시는 사진이 아니면 다시 클릭해주세요 !";
  };

  reader.readAsDataURL(e.target.files[0]);
}

function init() {
  input.addEventListener("change", update);
}

if (input) {
  init();
}
