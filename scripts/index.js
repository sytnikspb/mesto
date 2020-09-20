import {
  profileEditButton,
  profileMyName,
  profileProfession,
  inputMyName,
  inputProfession,
  formEditProfile,
  popupEditProfile,
  profileAddButton,
  inputPlaceName,
  inputPlaceLink,
  formAddPlace,
  popupAddPlace,
  places,
  placeTemplateSelector,
  popupCloseButtons,
  popupIllustration,
  illustrationImage,
  illustrationName,
  popupsList
} from './data.js';

import { defaultCards } from './defaultCards.js';
import { Card } from './Card.js';
import { FormValidator, enableValidationObj } from './Validate.js';

const formAddPlaceValidator = new FormValidator(enableValidationObj, formAddPlace);
const formEditProfileValidator = new FormValidator(enableValidationObj, formEditProfile);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupEsc);
}

function closePopupEsc(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopupOverlay(event) {
  if (event.currentTarget === event.target) {
    closePopup(event.currentTarget);
  }
}

function openEditProfile(popup) {
  formEditProfileValidator.resetFormBeforeOpen();

  inputMyName.value = profileMyName.textContent;
  inputProfession.value = profileProfession.textContent;

  openPopup(popup);
}

function updateProfile(event) {
  event.preventDefault();

  profileMyName.textContent = inputMyName.value;
  profileProfession.textContent = inputProfession.value;

  closePopup(popupEditProfile);
}

function openAddPlace(popup) {
  formAddPlaceValidator.resetFormBeforeOpen();

  openPopup(popup);
}

function addNewPlace(event) {
  event.preventDefault();

  const cardData = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };

  addingCard(cardData, placeTemplateSelector);
  closePopup(popupAddPlace);
}

function addingCard(el, placeTemplateSelector) {
  const card = new Card(el, placeTemplateSelector, openPopup, popupIllustration, illustrationImage, illustrationName);
  const placeElement = card.createPlaceCard();

  places.prepend(placeElement);
}

profileEditButton.addEventListener('click', () => openEditProfile(popupEditProfile));
profileAddButton.addEventListener('click', () => openAddPlace(popupAddPlace));
formEditProfile.addEventListener('submit', updateProfile);
formAddPlace.addEventListener('submit', addNewPlace);

popupsList.forEach(popup => popup.addEventListener('click', closePopupOverlay));
popupCloseButtons.forEach(el => el.addEventListener('click', () => closePopup(event.target.closest('.popup'))));

defaultCards.forEach((el) => addingCard(el, placeTemplateSelector));

formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();
