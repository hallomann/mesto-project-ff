const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "9615b320-39e2-43fc-8291-c0e5579165c8",
    "Content-Type": "application/json",
  },
};

// Для -ответа на запрос
function checkResponse(response) {
  if (response.ok) return response.json();
  return Promise.reject(
    `Ошибка: ${response.status} во время запроса информации о профиле.`
  );
}

// Запрос профиля пользователя
export const getProfile = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    });
    return await checkResponse(
      res,
      `Ошибка: ${res.status} во время запроса информации о профиле.`
    );
  } catch (error) {
    console.error("Произошла ошибка при получении профиля:", error);
  }
};

// Запрос списка карточек
export const getCards = async () => {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    });
    return await checkResponse(
      res,
      `Ошибка: ${res.status} во время запроса списка карточек.`
    );
  } catch (error) {
    console.error("Произошла ошибка при получении списка карточек:", error);
  }
};

// Запрос на обновление аватара пользователя
export const renewProfileAvatar = async (link) => {
  try {
    const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar: link }),
    });
    return await checkResponse(
      res,
      `Ошибка: ${res.status} во время обновления аватарки профиля.`
    );
  } catch (error) {
    console.error("Произошла ошибка при обновлении аватарки профиля:", error);
  }
};

// Запрос на обновление данных профлия пользователя
export const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) =>
    checkResponse(res, `Ошибка: ${res.status} во время обновления профиля.`)
  );
};

// Запрос на добавление новой карточки
export const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card),
  }).then((res) =>
    checkResponse(res, `Ошибка: ${res.status} во время сохранения карточки.`)
  );
};

// Запрос на добавление лайка карточке
export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) =>
    checkResponse(res, `Ошибка: ${res.status} во время установки лайка.`)
  );
};

// Запрос на удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    checkResponse(res, `Ошибка: ${res.status} во время удаления карточки.`)
  );
};

// Запрос на удаление лайка у карточки
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    checkResponse(res, `Ошибка: ${res.status} во время удаления лайка.`)
  );
};
