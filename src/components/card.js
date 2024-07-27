const config = {
  templateCardSelector: "#card-template",
  cardSelector: ".card",
  imageSelector: ".card__image",
  titleSelector: ".card__title",
  likeButtonSelector: ".card__button-like",
  likeIconSelector: ".card__like-svg",
  likeCountSelector: ".card__like-count",
  cardDeleteSelector: ".card__button-delete",
  cardLikeActiveClass: "card__button-like_active",
};

const cardTemplate = document.querySelector(
  config.templateCardSelector
).content;

// Создание нового объекта разметки карточки
export function create(
  card,
  openDialogDeleteCard,
  funcLikeCard,
  openDialogViewCard,
  dialogViewCard,
  profileId
) {
  const element = getCardTemplate(config.cardSelector);
  const title = element.querySelector(config.titleSelector);
  const image = element.querySelector(config.imageSelector);
  const btnCardDelete = element.querySelector(config.cardDeleteSelector);
  const btnLike = element.querySelector(config.likeButtonSelector);
  const btnLikeCount = btnLike.querySelector(config.likeCountSelector);
  const btnLikeIcon = btnLike.querySelector(config.likeIconSelector);

  if (profileId === card.owner._id) {
    btnCardDelete.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      openDialogDeleteCard(card);
    });
  } else element.querySelector(config.cardDeleteSelector).remove();

  if (isOwnerToLikedCard(card, profileId)) toggleIconActive(btnLikeIcon);

  element.id = card._id;
  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  btnLikeCount.textContent = card.likes.length;

  image.addEventListener("click", (event) =>
    openDialogViewCard(event, dialogViewCard)
  );

  btnLikeIcon.addEventListener("click", () => {
    funcLikeCard(card, btnLikeCount, btnLikeIcon, toggleIconActive);
    toggleIconActive(btnLikeIcon);
  });
  return element;
}

// Проверка наличия лайка у карточки
export function isOwnerToLikedCard(card, profileId) {
  return card.likes.filter((el) => el._id === profileId).length > 0;
}

// Переключение состояния иконки лайка
export function toggleIconActive(btnLikeSvg) {
  btnLikeSvg.classList.toggle(config.cardLikeActiveClass);
}

// Удаление карточки из разметки
export function remove(card) {
  card.remove();
}

function getCardTemplate(selector) {
  return cardTemplate.querySelector(selector).cloneNode(true);
}
