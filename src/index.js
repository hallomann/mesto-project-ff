import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, handleLikeactive } from "./components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";

// Глобальные константы и переменные с DOM-элементами страницы
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileForm = profileEditPopup.querySelector("form");
const nameInput = profileForm.querySelector('input[name="name"]');
const descriptionInput = profileForm.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardTitleInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

export {
  cardTemplate,
  profileEditPopup,
  imagePopup,
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  cardTitleInput,
  cardLinkInput,
  placesList,
  newCardPopup,
  popupImage,
  popupCaption
};

function handleImageClick(cardData) {
  openModal(imagePopup);
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
}

// Вывести карточки на страницу
initialCards.forEach((cardData, handleLikeactive) => {
  const cardElement = createCard(cardData, deleteCard, handleImageClick, handleLikeactive);
  placesList.appendChild(cardElement);
});

// Обработчики событий для открытия попапов
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
});

// Редактирование имени и информации о себе
export function handleProfileFormSubmit(
  evt,
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  profileEditPopup
) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closeModal(profileEditPopup);
}

function renderCard(item, callbacks, method = "prepend") {
  // создаем карточку, передавая обработчики в виде объекта `callbacks`
  const cardElement = createCard(item, callbacks, handleImageClick, handleLikeactive);
  // вставляем карточку, используя метод (вставится `prepend` или `append`)
  placesList[method](cardElement);
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
  newCardForm,
  closeModal,
  handleImageClick,
) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const newCardData = { name: titleValue, link: linkValue };
  const newCardElement = createCard(newCardData, deleteCard, handleImageClick);
  placesList.prepend(newCardElement);
  closeModal(newCardPopup);
  closeModal(newCardPopup);
  newCardForm.reset();
}

newCardAddButton.addEventListener("click", () => openModal(newCardPopup));

// Закрытие попапа по нажатию кнопки закрытия
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

// Закрытие попапа по клику на оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", closePopupByOverlay);
});

// Обработчик отправки формы редактирования профиля
profileForm.addEventListener("submit", (evt) =>
  handleProfileFormSubmit(
    evt,
    nameInput,
    descriptionInput,
    profileTitle,
    profileDescription,
    profileEditPopup
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
    newCardForm,
    closeModal,
    handleImageClick,
  )
);
