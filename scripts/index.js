const defaultCards = [
  {
    name: 'Бали. Индонезия',
    link: 'https://images.unsplash.com/photo-1482348838597-b97cc6c86a88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'
  },
  {
    name: 'Сахара. Африка',
    link: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
  },
  {
    name: 'Мачу-Пикчу. Перу',
    link: 'https://images.unsplash.com/photo-1415804941191-bc0c3bbac10d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Фьядрарглуфюр. Исландия',
    link: 'https://images.unsplash.com/photo-1536610350990-079f9db69b55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80'
  },
  {
    name: 'Этрета. Франция',
    link: 'https://images.unsplash.com/photo-1541187714594-731deadcd16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Ао Нанг. Тайланд',
    link: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80'
  }
];

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
const placeTemplate = document.querySelector('#place-template').content;
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const popupIllustration = document.querySelector('.popup_type_illustration');
const illustrationImage = popupIllustration.querySelector('.popup__image');
const illustrationName = popupIllustration.querySelector('.popup__caption');

const popupsList = document.querySelectorAll('.popup');

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

function openEditProfile(popup) {
  resetFormBeforeOpen(popup);
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
  resetFormBeforeOpen(popup);
  openPopup(popup);
}

function removeElement(event) {
  event.target.closest('.place').remove();
}

function toggleLike(event) {
  event.currentTarget.classList.toggle('place__like-button_active');
}

function openIllustration(imgLink, caption) {
  illustrationImage.src = imgLink;
  illustrationImage.alt = caption;
  illustrationName.textContent = caption;

  openPopup(popupIllustration);
}

function createPlaceCard(imgLink, name) {
  const placeElement = placeTemplate.cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');

  placeImage.src = imgLink;
  placeImage.alt = name;
  placeElement.querySelector('.place__title').textContent = name;

  placeImage.addEventListener('click', () => openIllustration(imgLink, name));
  placeElement.querySelector('.place__remove-button').addEventListener('click', removeElement);
  placeElement.querySelector('.place__like-button').addEventListener('click', toggleLike);

  return placeElement;
}

function addNewPlace(event) {
  event.preventDefault();

  const card = createPlaceCard(inputPlaceLink.value, inputPlaceName.value);

  places.prepend(card);

  closePopup(popupAddPlace);
}

profileEditButton.addEventListener('click', () => openEditProfile(popupEditProfile));
profileAddButton.addEventListener('click', () => openAddPlace(popupAddPlace));
formEditProfile.addEventListener('submit', updateProfile);
formAddPlace.addEventListener('submit', addNewPlace);

popupsList.forEach(popup => popup.addEventListener('click', event => {
  if (event.currentTarget === event.target) {
    closePopup(event.currentTarget);
  }
}));

popupCloseButtons.forEach(el => el.addEventListener('click', () => closePopup(event.target.closest('.popup'))));

defaultCards.forEach(el => places.prepend(createPlaceCard(el.link, el.name)));
