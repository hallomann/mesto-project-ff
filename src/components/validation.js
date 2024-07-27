// Установка события сабмит
export const enableValidation = (forms, сonfig) => {
  for (const form of forms) {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(form, сonfig);
  }
};

// Очистка проверки валидации формы
export const clearValidation = (form, config) => {
  const errorList = [...form.querySelectorAll(config.errorSelector)];
  const inputList = [...form.querySelectorAll(config.inputSelector)];
  const submit = form.querySelector(config.submitButtonSelector);

  form.reset();

  errorList.forEach((error) => {
    error.classList.remove(config.errorClass);
    error.textContent = "";
  });

  inputList.forEach((input) => input.classList.remove(config.inputErrorClass));

  toggleButtonState(inputList, submit, config);
};

// Установка события инпут
const setEventListeners = (form, config) => {
  const inputList = [...form.querySelectorAll(config.inputSelector)];
  const submit = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, submit, config);
    });
  });
};

// Проверка валидации инпута
const checkInputValidity = (form, input, config) => {
  if (input.validity.valueMissing) {
    input.setCustomValidity(input.dataset.errorEmpty);
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorPattern);
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity(input.dataset.errorType);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

// Изменение невалидного инпута
const showInputError = (form, input, errorMessage, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  error.classList.add(config.errorClass);
  error.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
};

// Измененение валидного инпута
const hideInputError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  error.classList.remove(config.errorClass);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

// Переключение состояния сабмит
const toggleButtonState = (inputs, submit, config) => {
  if (hasInvalidInput(inputs)) {
    submit.classList.add(config.inactiveButtonClass);
    submit.disabled = true;
  } else {
    submit.classList.remove(config.inactiveButtonClass);
    submit.disabled = false;
  }
};

// Проверка формы на не валидные инпуты
const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};
