import initialCards from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const createCard = (cardData, deleteHandler) => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => deleteHandler(cardElement));

    return cardElement;
}

const deleteCard = (cardElement) => {
    cardElement.remove();
}

const renderCards = (cards, deleteHandler) => {
    const fragment = document.createDocumentFragment();
    cards.forEach(cardData => {
        const cardElement = createCard(cardData, deleteHandler);
        fragment.append(cardElement);
    });
    cardsContainer.append(fragment);
}

renderCards(initialCards, deleteCard);
