const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, likeCard, zoomImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardAlt = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardAlt.alt = cardData.alt;

  cardDeleteButton.addEventListener("click", () => deleteCard(cardElement));
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
