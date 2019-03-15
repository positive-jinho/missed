const likeBtns = document.getElementsByClassName("like");
const downloadBtns = document.getElementsByClassName("fa-file-download");

function like(e) {
  e.preventDefault();
  const element = e.target;

  const photoId = element.dataset.id;

  fetch(`/api${photoId}/like`, {
    method: "POST"
  })
    .then(res => res.json())
    .then(res => res.message)
    .then(message => {
      if (message !== "not logged in") {
        element.classList.toggle("far");
        element.classList.toggle("fas");
        element.classList.toggle("like-active");

        const cnt = parseInt(element.previousSibling.textContent);
        const div = document.createElement("div");

        if (message === "like") {
          element.previousSibling.textContent = cnt + 1;
          div.className = "flash-message__container info";
          div.textContent = "👍 좋아요 !";
        } else {
          element.previousSibling.textContent = cnt - 1;
          div.className = "flash-message__container info";
          div.textContent = "😅 잘못 눌렀네요";
        }

        document.body.appendChild(div);
      } else {
        const div = document.createElement("div");
        div.className = "flash-message__container error";
        div.textContent = "🙏 로그인 해주세요 !";
        document.body.appendChild(div);
      }
    });
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
