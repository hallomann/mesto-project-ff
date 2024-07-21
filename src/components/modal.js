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

// Редактирование имени и информации о себе
export function handleProfileFormSubmit(
  evt,
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  editPopup
) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(editPopup);
}

// Форма добавления карточки
export function handleNewCardFormSubmit(
  evt,
  cardTitleInput,
  cardLinkInput,
  createCard,
  deleteCard,
  placesList,
  newCardPopup,
  newCardForm
) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const newCardData = { name: titleValue, link: linkValue };
  const newCardElement = createCard(newCardData, deleteCard);
  placesList.prepend(newCardElement);
  closeModal(newCardPopup);
  newCardForm.reset();
}
