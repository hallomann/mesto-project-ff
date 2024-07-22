const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

function createCard(
  cardData,
  deleteCallback,
  handleImageClick,
  handleLikeactive
) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  const sendLike = (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", sendLike);

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  return cardElement;
}

export function handleLikeactive(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const renderCards = (cards, deleteHandler, handleImageClick, handleLikeactive) => {
  const fragment = document.createDocumentFragment();
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteHandler, handleImageClick, handleLikeactive);
    fragment.append(cardElement);
  });
  cardsContainer.append(fragment);
};

export { createCard, deleteCard, renderCards };
