import * as api from "./components/api.js";
import * as Card from "./components/card.js";
import * as Modal from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import "./styles/index.css";

/* Константы */

const profileConfig = {};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".popup__form-field_error",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__error_visible",
  inputErrorClass: "popup__input-type_error",
  inactiveButtonClass: "popup__button-disabled",
};

const cardListSelector = document.querySelector(".places__list");
const modals = document.querySelectorAll(".popup");
const avatarSelector = document.querySelector(".profile__image");

const profileAvatar = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const profileTitle = document.querySelector(".profile__title");

const btnEditAvatar = document.querySelector(".profile__avatar");
const btnCardAdd = document.querySelector(".profile__button-add");
const btnProfileEdit = document.querySelector(".profile__button-edit");
const btnDeleteCard = document.querySelector(".popup__confirmation");

const dialogAddCard = document.querySelector(".popup_type_new-card");
const dialogDeleteCard = document.querySelector(".popup_type_delete_card");
const dialogEditAvatar = document.querySelector(".popup_type_edit-avatar");
const dialogEditProfile = document.querySelector(".popup_type_edit-profile");

const dialogCardView = document.querySelector(".popup_type_image");
const dialogCardViewImage = dialogCardView.querySelector(".popup__image");
const dialogCardViewCaption = dialogCardView.querySelector(".popup__caption");

const formAddCard = document.forms.new_place;
const formEditProfile = document.forms.edit_profile;
const formEditAvatar = document.forms.edit_avatar;

/* Функции */

// Рендер веб-страницы при первой загрузке
function loadPage() {
  Promise.all([api.getProfile(), api.getCards()])
    .then(([responseProfile, responseCards]) => {
      loadProfilePage(responseProfile);
      loadCards(responseCards);
      profileTitle.textContent = profileConfig.title;
      profileDescription.textContent = profileConfig.about;
      profileAvatar.src = profileConfig.avatar;
    })
    .catch((err) => console.log(err));
}

// Рендер профиля
function loadProfilePage(profile) {
  profileConfig.id = profile._id;
  profileConfig.title = profile.name;
  profileConfig.about = profile.about;
  profileConfig.avatar = profile.avatar;
}

// Рендер карточек на веб-странице
function loadCards(data) {
  data.forEach((item) => {
    const card = Card.create(
      item,
      openDialogDeleteCard,
      likedCard,
      openDialogViewCard,
      dialogCardView,
      profileConfig.id
    );
    cardListSelector.append(card);
  });
}

// Открыть попап
function openDialog(modal, form) {
  clearValidation(form, validationConfig);
  Modal.open(modal);
}

// Попап удаления карточки
function openDialogDeleteCard(card) {
  const submit = dialogDeleteCard.querySelector(".popup__button");
  Modal.open(dialogDeleteCard);
  btnDeleteCard.addEventListener("click", () =>
    confirmationDeleteCard(card, dialogDeleteCard, submit)
  );
}

// Удаление карточки
function confirmationDeleteCard(card, dialog, submit) {
  submit.textContent = "Сохранение...";
  api
    .deleteCard(card.id)
    .then(() => {
      Card.remove(card);
      Modal.close(dialog);
      submit.textContent = "Сохранение";
    })
    .catch((err) => console.log(err));
}

// Попап просмотра изображения карточки
function openDialogViewCard(evt, dialog) {
  const card = evt.target.closest(".card");
  const cardTitle = card.querySelector(".card__title").textContent;
  const cardScr = card.querySelector(".card__image").src;
  dialogCardViewImage.src = cardScr;
  dialogCardViewImage.alt = cardTitle;
  dialogCardViewCaption.textContent = cardTitle;
  Modal.open(dialog);
}

// Сохранение профиля после редактирования
function saveDialogEditProfile(event, form, title, description) {
  const dialog = Modal.getOpenDialog();
  const name = form.name.value;
  const about = form.description.value;
  const btn = dialog.querySelector(".popup__button");
  btn.textContent = "Сохранение...";
  event.preventDefault();
  title.textContent = name;
  description.textContent = about;
  api
    .patchProfile(name, about)
    .then(() => Modal.close(dialog))
    .catch((err) => console.log(err))
    .finally(() => (btn.textContent = "Сохранить"));
}

// Сохранение карточки после редактирования
function saveDialogAddCard(event, form, cardListSelector) {
  const dialog = Modal.getOpenDialog();
  const card = {
    name: form.name.value,
    link: form.link.value,
  };
  const btn = dialog.querySelector(".popup__button");
  btn.textContent = "Сохранение...";
  event.preventDefault();
  new Promise(() => {
    api
      .postCard(card)
      .then((res) => {
        const card = Card.create(
          res,
          openDialogDeleteCard,
          likedCard,
          openDialogViewCard,
          dialogCardView,
          profileConfig.id
        );
        cardListSelector.insertBefore(card, cardListSelector.firstElementChild);
        Modal.close(dialog);
      })
      .catch((err) => console.log(err))
      .finally(() => (btn.textContent = "Сохранить"));
  });
}

// Сохранение информации о новом аватаре
function updateProfileAvatar(event, form, selector) {
  const dialog = Modal.getOpenDialog();
  const link = form.link.value;
  const btn = dialog.querySelector(".popup__button");
  btn.textContent = "Сохранение...";
  event.preventDefault();
  api
    .renewProfileAvatar(link)
    .then(() => {
      selector.src = link;
      Modal.close(dialog);
    })
    .catch((err) => console.log(err))
    .finally(() => (btn.textContent = "Сохранить"));
}

// Постановка лайка
function likedCard(card, count) {
  if (Card.isOwnerToLikedCard(card, profileConfig.id)) {
    api
      .deleteLikeCard(card._id)
      .then((res) => updateLikedCard(res, card, count))
      .catch((err) => console.log(err));
  } else {
    api
      .putLikeCard(card._id)
      .then((res) => updateLikedCard(res, card, count))
      .catch((err) => console.log(err));
  }
}

// Счетчик лайков
function updateLikedCard(data, card, count) {
  card.likes = data.likes;
  count.textContent = card.likes.length;
}

/* События */

// Mousedown на формы
modals.forEach((form) => {
  form.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_is-opened")) Modal.close(form);
    if (event.target.classList.contains("popup__close")) Modal.close(form);
  });
});

// Открытие формы для изменения информации профиля
btnProfileEdit.addEventListener("click", () => {
  const args = [dialogEditProfile, formEditProfile];
  openDialog(...args);
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDescription.textContent;
});

// Открытие формы для добавлния карточки
btnCardAdd.addEventListener("click", () => {
  const args = [dialogAddCard, formAddCard];
  openDialog(...args);
});

// Сохранение информации о профиле
formEditProfile.addEventListener("submit", (event) => {
  const args = [event, formEditProfile, profileTitle, profileDescription];
  saveDialogEditProfile(...args);
});

// Открытие формы для редактирования аватарки
btnEditAvatar.addEventListener("click", () => {
  const args = [dialogEditAvatar, formEditAvatar];
  openDialog(...args);
});

// Сохранение аватара в профиле
formEditAvatar.addEventListener("submit", function (event) {
  const args = [event, formEditAvatar, avatarSelector];
  updateProfileAvatar(...args);
});

// Сохранение новой картчоки
formAddCard.addEventListener("submit", function (event) {
  const args = [event, formAddCard, cardListSelector, Card.create, Card.remove];
  saveDialogAddCard(...args);
});


loadPage();
enableValidation(document.forms, validationConfig);
