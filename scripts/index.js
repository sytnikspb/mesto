const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const profileMyName = document.querySelector('.profile__myname');
const profileProfession = document.querySelector('.profile__profession');
const inputMyName = popup.querySelector('.popup__input_type_myname');
const inputProffesion = popup.querySelector('.popup__input_type_profession');

function popupToggle(event) {
  if (!popup.classList.contains('popup_opened')) {
    inputMyName.value = profileMyName.textContent;
    inputProffesion.value = profileProfession.textContent;
  }
  if (event.currentTarget === event.target) {
    popup.classList.toggle('popup_opened');
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileMyName.textContent = inputMyName.value;
  profileProfession.textContent = inputProffesion.value;
  popupToggle(event);
}

profileEditButton.addEventListener('click', popupToggle);
popupContainer.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', popupToggle);
popup.addEventListener('click', popupToggle);
// popup.addEventListener добавляет закрытие не только по close-button, но и по свободной области вне popupContainer
