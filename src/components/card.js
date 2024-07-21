import { openModal } from "./modal.js";
import { imagePopup } from "../index.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(cardData, deleteCallback, imageOpenClick, cardLikeActive) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

    function imageOpenClick () {
      openModal(imagePopup);
      const popupImage = imagePopup.querySelector(".popup__image");
      const popupCaption = imagePopup.querySelector(".popup__caption");
  
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;
    }
  cardImage.addEventListener("click", imageOpenClick);

  function cardLikeActive (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", cardLikeActive);

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const renderCards = (cards, deleteHandler) => {
  const fragment = document.createDocumentFragment();
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteHandler);
    fragment.append(cardElement);
  });
  cardsContainer.append(fragment);
};

export { createCard, deleteCard, renderCards };
