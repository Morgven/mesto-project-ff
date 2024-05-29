import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import { validationConfig, enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, editProfileData, createCardOnServer } from "./api.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const editProfileName = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescription = editProfileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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
  clearValidation(editProfileForm, validationConfig);
});
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
editProfileCloseButton.addEventListener("click", () => closeModal(editProfileModal));

createCardButton.addEventListener("click", () => { 
  createCardForm.reset();
  openModal(createCardModal);
  clearValidation(createCardForm, validationConfig);
});
createCardForm.addEventListener('submit', handleAddCardSubmit);
createCardCloseButton.addEventListener("click", () => closeModal(createCardModal));

zoomImageCloseButton.addEventListener("click", () => closeModal(zoomImageModal));

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  editProfileData(editProfileName.value, editProfileDescription.value)
  .then((ProfileData) => {
    profileName.textContent = ProfileData.name;
    profileDescription.textContent = ProfileData.about;
  })
  .catch((err) => console.log(err));
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  createCardOnServer(createCardName.value, createCardLink.value)
  .then((cardData) => {
    placesList.prepend(createCard(cardData, deleteCard, likeCard, zoomImage));
  })
  .catch((err) => console.log(err));
  createCardForm.reset();
  closeModal(createCardModal);
}

function zoomImage(image) {
  zoomImageCaption.textContent = image.name;
  zoomImageSource.src = image.link;
  zoomImageSource.alt = image.name;
  openModal(zoomImageModal);
}

// function displayLocalCards(cardsArray) {
//   cardsArray.forEach(function (cardData) {
//     const cardElement = createCard(cardData, deleteCard, likeCard, zoomImage);
//     placesList.appendChild(cardElement);
//   });
// }

// displayLocalCards(initialCards);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
    .then( function displayServerCardsAndUserInfo([userInfo, cardsArray]) {
      const userId = userInfo._id;
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
      cardsArray.forEach(function (cardData) {
        placesList.append(
          createCard(cardData, deleteCard, likeCard, zoomImage, userId)
        );
      })
    })
    .catch((err) => console.log(err));