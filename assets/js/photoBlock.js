const likeBtns = document.getElementsByClassName("like");
const downloadBtns = document.getElementsByClassName("fa-file-download");

function like(e) {
  e.preventDefault();
  const element = e.target;
  const isActive = element.classList.contains("like-active");

  element.classList.toggle("far");
  element.classList.toggle("fas");
  element.classList.toggle("like-active");

  const photoId = element.dataset.id;
  fetch(`/api${photoId}/like`, {
    method: "POST"
  });

  const cnt = parseInt(element.previousSibling.textContent);
  element.previousSibling.textContent = cnt + 1;
}

function download(e) {
  e.preventDefault();

  const photoId = e.target.dataset.id;
  fetch(`/api${photoId}/download`, {
    method: "POST"
  });

  const a = document.createElement("a");
  a.href = e.target.dataset.src;
  a.download = "download.jpg";
  a.click();
}

function init() {
  for (let element of likeBtns) {
    element.addEventListener("click", like);
  }

  for (let element of downloadBtns) {
    element.addEventListener("click", download);
  }
}

if (likeBtns) {
  init();
}
