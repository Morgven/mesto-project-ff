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
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardAlt.alt = cardData.name;

  if (cardData.owner["_id"] === userId) {
    cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
  } else {
    deleteButton.remove();
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => zoomImage(cardData));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeIcon) {
  likeIcon.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
