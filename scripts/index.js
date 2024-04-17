// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardAlt = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardAlt.alt = cardData.alt;

  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function displayCards(cardsArray) {
  cardsArray.forEach(function (cardData) {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
  });
}

displayCards(initialCards);
