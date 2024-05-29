import { deleteCardOnServer, putLike, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, likeCard, zoomImage, userId) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardAlt = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeButtonCount = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardAlt.alt = cardData.name;
  likeButtonCount.textContent = cardData.likes.length;

  if (cardData.owner["_id"] === userId) {
    cardDeleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(cardData._id)
        .then((cardData) => {
          likeButton.classList.toggle("card__like-button_is-active");
          likeButtonCount.textContent = cardData.likes.length;
          likeCard;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(cardData._id)
        .then((cardData) => {
          likeButton.classList.toggle("card__like-button_is-active");
          likeButtonCount.textContent = cardData.likes.length;
          likeCard;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  cardImage.addEventListener("click", () => zoomImage(cardData));

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  deleteCardOnServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(likeIcon) {
  likeIcon.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
