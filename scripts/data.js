const profileEditButton = document.querySelector('.profile__edit-button');
const profileMyName = document.querySelector('.profile__myname');
const profileProfession = document.querySelector('.profile__profession');
const inputMyName = document.querySelector('.popup__input_type_myname');
const inputProfession = document.querySelector('.popup__input_type_profession');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const profileAddButton = document.querySelector('.profile__add-button');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputPlaceLink = document.querySelector('.popup__input_type_place-link');
const formAddPlace = document.querySelector('.popup__form_type_add-place');
const popupAddPlace = document.querySelector('.popup_type_add-place');

const places = document.querySelector('.places');
const placeTemplateSelector = '#place-template';
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupIllustration = document.querySelector('.popup_type_illustration');
const illustrationImage = popupIllustration.querySelector('.popup__image');
const illustrationName = popupIllustration.querySelector('.popup__caption');

const popupsList = document.querySelectorAll('.popup');

export {
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
};
