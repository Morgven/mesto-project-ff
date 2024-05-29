import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import { validationConfig, enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, editProfileData, createCardOnServer, editProfileAvatar } from "./api.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const editProfileName = editProfileForm.querySelector(".popup__input_type_name");
const editProfileDescription = editProfileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileImage = document.querySelector('.profile__image');
const editProfileImageModal = document.querySelector(".popup_type_edit-avatar");
const editProfileImageCloseButton = editProfileImageModal.querySelector(".popup__close");
const editProfileImageForm = editProfileImageModal.querySelector(".popup__form");
const editProfileAvatarInput = editProfileImageForm.querySelector(".popup__input_type_avatar-url");

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

const buttonSubmit = document.querySelector(".popup__button");
const placesList = document.querySelector(".places__list");

editProfileButton.addEventListener("click", () => { 
  openModal(editProfileModal)
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
});
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
editProfileCloseButton.addEventListener("click", () => closeModal(editProfileModal));

profileImage.addEventListener("click", () => {
  editProfileImageForm.reset();
  openModal(editProfileImageModal);
  clearValidation(editProfileImageForm, validationConfig);
});
editProfileImageForm.addEventListener('submit', handleEditProfileImageSubmit);
editProfileImageCloseButton.addEventListener("click", () => closeModal(editProfileImageModal));

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
  buttonSubmit.textContent = 'Сохранение...';
  editProfileData(editProfileName.value, editProfileDescription.value)
  .then((profileData) => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
  closeModal(editProfileModal);
}

function handleEditProfileImageSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  editProfileAvatar(editProfileAvatarInput.value)
  .then((newProfileImage) => {
    profileImage.style.backgroundImage = `url('${newProfileImage}')`;
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
  editProfileImageForm.reset();
  closeModal(editProfileImageModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  createCardOnServer(createCardName.value, createCardLink.value)
  .then((cardData) => {
    placesList.prepend(createCard(cardData, deleteCard, likeCard, zoomImage));
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
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