import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from "./modal.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const editProfileName = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescription = editProfileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const createCardButton = document.querySelector(".profile__add-button");
const createCardModal = document.querySelector(".popup_type_new-card");
const createCardCloseButton = createCardModal.querySelector(".popup__close");
const createCardForm = createCardModal.querySelector(".popup__form");
const createCardName = createCardForm.querySelector(".popup__input_type_card-name");
const createCardLink = createCardForm.querySelector(".popup__input_type_url");

const zoomImageModal = document.querySelector(".popup_type_image");
const zoomImageSource = document.querySelector(".popup__image");
const zoomImageCaption = document.querySelector(".popup__caption");
const zoomImageCloseButton = zoomImageModal.querySelector(".popup__close");

const placesList = document.querySelector(".places__list");

editProfileButton.addEventListener("click", () => { 
  openModal(editProfileModal)
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
});
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
editProfileCloseButton.addEventListener("click", () => closeModal(editProfileModal));

createCardButton.addEventListener("click", () => openModal(createCardModal));
createCardForm.addEventListener('submit', handleAddCardSubmit);
createCardCloseButton.addEventListener("click", () => {
  createCardForm.reset();
  closeModal(createCardModal)
});

zoomImageCloseButton.addEventListener("click", () => closeModal(zoomImageModal));

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: createCardName.value,
    link: createCardLink.value,
  };
  placesList.prepend(createCard(cardData, deleteCard, likeCard, zoomImage));
  createCardForm.reset();
  closeModal(createCardModal);
}

function zoomImage(image) {
  zoomImageCaption.textContent = image.name;
  zoomImageSource.src = image.link;
  zoomImageSource.alt = image.name;
  openModal(zoomImageModal);
}

function displayCards(cardsArray) {
  cardsArray.forEach(function (cardData) {
    const cardElement = createCard(cardData, deleteCard, likeCard, zoomImage);
    placesList.appendChild(cardElement);
  });
}

displayCards(initialCards);

