// Открытие модального окна
export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

// Закрытие модального окна
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}

// Обработчик закрытия нажатием клавиши Esc
function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Обработчик события клика по оверлею
export function closePopupByOverlay(event) {
  if (event.target && event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}
