const enableValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function enableValidation({formSelector, ...rest}) {
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function resetFormBeforeOpen(popup) {
  const formElement = popup.querySelector(enableValidationObj.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(enableValidationObj.inputSelector));
  const buttonElement = formElement.querySelector(enableValidationObj.submitButtonSelector);
  const rest = {
    'inputErrorClass' : enableValidationObj.inputErrorClass,
    'errorClass' : enableValidationObj.errorClass
  };
  inputList.forEach(inputElement => {
    inputElement.value = '';
    hideInputError(formElement, inputElement, rest);
  });
  buttonElement.classList.add(enableValidationObj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
};

enableValidation(enableValidationObj);
