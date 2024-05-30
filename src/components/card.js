const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  cardData,
  zoomImage,
  userId,
  handleLikeCard,
  handleDeleteCard
) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const buttonLikeCount = cardElement.querySelector(".card__like-counter");
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  buttonLikeCount.textContent = cardData.likes.length;

  if (cardData.owner["_id"] === userId) {
    buttonDelete.addEventListener("click", () =>
      handleDeleteCard(cardElement, cardData._id)
    );
  } else {
    buttonDelete.remove();
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () =>
    handleLikeCard(buttonLike, buttonLikeCount, cardData._id)
  );

  cardImage.addEventListener("click", () => zoomImage(cardData));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(buttonLike, buttonLikeCount, newCardData) {
  buttonLike.classList.toggle("card__like-button_is-active");
  buttonLikeCount.textContent = newCardData.likes.length;
}

export { createCard, deleteCard, likeCard };
