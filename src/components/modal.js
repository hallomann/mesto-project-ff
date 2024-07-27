const config = {
  popUpIsOpenSelector: ".popup_is-opened",
  popUpIsOpenClass: "popup_is-opened",
};

// Закрытие попапа по нажатию Escape
function handleEscClose(event) {
  if (event.key === "Escape") {
    const dialog = getOpenDialog();
    close(dialog);
  }
}

// Открытие попапа
export function open(dialog) {
  dialog.classList.add(config.popUpIsOpenClass);
  document.addEventListener("keydown", handleEscClose);
}

// Закрытие попапа
export function close(dialog) {
  dialog.classList.remove(config.popUpIsOpenClass);
  document.removeEventListener("keydown", handleEscClose);
}

// Поиск открытого попапа
export function getOpenDialog() {
  return document.querySelector(config.popUpIsOpenSelector);
}
