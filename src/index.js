import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleProfileFormSubmit,
  handleNewCardFormSubmit,
  closePopupByOverlay,
} from "./components/modal.js";

// Глобальные константы и переменные с DOM-элементами страницы
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const formElement = editPopup.querySelector("form");
const nameInput = formElement.querySelector('input[name="name"]');
const descriptionInput = formElement.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardTitleInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

export {
  cardTemplate,
  editPopup,
  imagePopup,
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  cardTitleInput,
  cardLinkInput,
  placesList,
  newCardPopup,
};

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.appendChild(cardElement);
});

// Обработчики событий для открытия попапов
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addButton.addEventListener("click", () => openModal(newCardPopup));

// Закрытие попапа по нажатию кнопки закрытия
closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

// Закрытие попапа по клику на оверлей
window.addEventListener("click", closePopupByOverlay);

// Обработчик отправки формы редактирования профиля
formElement.addEventListener("submit", (evt) =>
  handleProfileFormSubmit(
    evt,
    nameInput,
    descriptionInput,
    profileTitle,
    profileDescription,
    editPopup
  )
);

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener("submit", (evt) =>
  handleNewCardFormSubmit(
    evt,
    cardTitleInput,
    cardLinkInput,
    createCard,
    deleteCard,
    placesList,
    newCardPopup,
    newCardForm
  )
);
