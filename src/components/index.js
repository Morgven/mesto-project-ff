import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from "./modal.js";
import { validationConfig, enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, editProfileData, createCardOnServer, editProfileAvatar, deleteCardOnServer, putLike, deleteLike } from "./api.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const moldalEditProfile = document.querySelector(".popup_type_edit");
const buttonCloseEditProfile = moldalEditProfile.querySelector(".popup__close");
const formEditProfile = moldalEditProfile.querySelector(".popup__form");
const nameEditProfile = formEditProfile.querySelector(".popup__input_type_name");
const descriptionEditProfile = formEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileImage = document.querySelector('.profile__image');
const modalEditProfileImage = document.querySelector(".popup_type_edit-avatar");
const buttonCloseEditProfileImage = modalEditProfileImage.querySelector(".popup__close");
const formEditProfileImage = modalEditProfileImage.querySelector(".popup__form");
const avatarInput = formEditProfileImage.querySelector(".popup__input_type_avatar-url");

const buttonCreateCard = document.querySelector(".profile__add-button");
const modalCreateCard = document.querySelector(".popup_type_new-card");
const buttonCloseCreateCard = modalCreateCard.querySelector(".popup__close");
const formCreateCard = modalCreateCard.querySelector(".popup__form");
const nameCreateCard = formCreateCard.querySelector(".popup__input_type_card-name");
const linkCreateCard = formCreateCard.querySelector(".popup__input_type_url");

const modalZoomImage = document.querySelector(".popup_type_image");
const sourceZoomImage = document.querySelector(".popup__image");
const captionZoomImage = document.querySelector(".popup__caption");
const buttonCloseZoomImage = modalZoomImage.querySelector(".popup__close");

const buttonSubmit = document.querySelector(".popup__button");
const placesList = document.querySelector(".places__list");

buttonEditProfile.addEventListener("click", () => { 
  openModal(moldalEditProfile)
  nameEditProfile.value = profileName.textContent;
  descriptionEditProfile.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});
formEditProfile.addEventListener('submit', handleEditProfileSubmit);
buttonCloseEditProfile.addEventListener("click", () => closeModal(moldalEditProfile));

profileImage.addEventListener("click", () => {
  formEditProfileImage.reset();
  openModal(modalEditProfileImage);
  clearValidation(formEditProfileImage, validationConfig);
});
formEditProfileImage.addEventListener('submit', handleEditProfileImageSubmit);
buttonCloseEditProfileImage.addEventListener("click", () => closeModal(modalEditProfileImage));

buttonCreateCard.addEventListener("click", () => { 
  formCreateCard.reset();
  openModal(modalCreateCard);
  clearValidation(formCreateCard, validationConfig);
});
formCreateCard.addEventListener('submit', handleAddCardSubmit);
buttonCloseCreateCard.addEventListener("click", () => closeModal(modalCreateCard));

buttonCloseZoomImage.addEventListener("click", () => closeModal(modalZoomImage));

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  editProfileData(nameEditProfile.value, descriptionEditProfile.value)
  .then((profileData) => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    closeModal(moldalEditProfile);
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
}

function handleEditProfileImageSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  editProfileAvatar(avatarInput.value)
  .then((newProfileImage) => {
    profileImage.style.backgroundImage = `url('${newProfileImage}')`;
    formEditProfileImage.reset();
    closeModal(modalEditProfileImage);
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  buttonSubmit.textContent = 'Сохранение...';
  createCardOnServer(nameCreateCard.value, linkCreateCard.value)
  .then((cardData) => {
    placesList.prepend(createCard(cardData, deleteCard, likeCard, zoomImage, userId, handleLikeCard));
    formCreateCard.reset();
    closeModal(modalCreateCard);
  })
  .catch((err) => console.log(err))
  .finally(() => buttonSubmit.textContent = 'Сохранить');
}

function handleLikeCard(buttonLike, buttonLikeCount, cardId) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((newCardData) => {likeCard(buttonLike, buttonLikeCount, newCardData);})
      .catch((err) => {console.log(err);});
  } else {
    putLike(cardId)
      .then((newCardData) => {likeCard(buttonLike, buttonLikeCount, newCardData);})
      .catch((err) => {console.log(err);});
  }
}

function zoomImage(image) {
  captionZoomImage.textContent = image.name;
  sourceZoomImage.src = image.link;
  sourceZoomImage.alt = image.name;
  openModal(modalZoomImage);
}

// function displayLocalCards(cardsArray) {
//   cardsArray.forEach(function (cardData) {
//     const cardElement = createCard(cardData, deleteCard, likeCard, zoomImage);
//     placesList.appendChild(cardElement);
//   });
// }

// displayLocalCards(initialCards);

enableValidation(validationConfig);

let userId;
Promise.all([getUserInfo(), getInitialCards()])
    .then( function displayServerCardsAndUserInfo([userInfo, cardsArray]) {
      userId = userInfo._id;
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
      cardsArray.forEach(function (cardData) {
        placesList.append(
          createCard(cardData, deleteCard, likeCard, zoomImage, userId, handleLikeCard)
        );
      })
    })
    .catch((err) => console.log(err));