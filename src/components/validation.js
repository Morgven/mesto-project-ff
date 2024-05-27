const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config.inputErrorClass);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function checkInputValidity(formElement, inputElement, inputErrorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      inputElement.validationMessage
    );
  }
}

function showInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config.inputErrorClass);
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
}

export { validationConfig, enableValidation, clearValidation };
