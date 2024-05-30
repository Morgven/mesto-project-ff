function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
  modal.addEventListener("click", closeWithOverlay);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
  modal.removeEventListener("click", closeWithOverlay);
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeWithOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal };
