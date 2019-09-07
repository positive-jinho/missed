const likeBtns = document.getElementsByClassName("like");
const downloadBtns = document.getElementsByClassName("fa-file-download");

function like(e) {
  e.preventDefault();
  const element = e.target;

  const photoId = element.dataset.id;

  fetch(`/api${photoId}/like`, {
    method: "POST"
  })
    .then(res => res.status)
    .then(status => {
      const div = document.createElement("div");

      if (status !== 400) {
        const cnt = parseInt(element.previousSibling.textContent);
        div.className = "flash-message__container info";

        if (status === 201) {
          element.previousSibling.textContent = cnt + 1;
          div.textContent = "👍 좋아요 !";
        } else {
          element.previousSibling.textContent = cnt - 1;
          div.textContent = "😅 잘못 눌렀네요";
        }
      } else {
        div.className = "flash-message__container error";
        div.textContent = "🙏 로그인 해주세요 !";
      }

      document.body.appendChild(div);
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

function zoom(e) {
  e.preventDefault();
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
