import { hexToString } from "./colorMap.js";

const deckSection = document.querySelector('#deck-view');
const deckTitle = deckSection.querySelector('.gallery__title');
const deckCardList = deckSection.querySelector('.gallery__list');
const flashcardTemplate = document.querySelector('#flashcard-template').content;

// Sections for toggling visibility
const homeSection = document.querySelector('#home');
const carouselSection = document.querySelector('#carousel-view');
const notFoundSection = document.querySelector('#not-found');

function createFlashcardEl(card, deck) {
  const flashcardElement = flashcardTemplate.querySelector('.card').cloneNode(true);
  const titleEl = flashcardElement.querySelector('.card__title');
  const flipBtn = flashcardElement.querySelector('.card__edit-btn');
  const deleteBtn = flashcardElement.querySelector('.card__delete-btn');

  const colorName = hexToString(deck.color);
  flashcardElement.classList.add(`card_color_${colorName}`);
  flashcardElement.dataset.flipped = 'false';
  titleEl.textContent = card.question;

  flipBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const flipped = flashcardElement.dataset.flipped === 'true';
    flashcardElement.dataset.flipped = String(!flipped);

    if (flipped) {
      titleEl.textContent = card.question;
      flashcardElement.classList.remove('card_color_white');
      flashcardElement.classList.add(`card_color_${colorName}`);
    } else {
      titleEl.textContent = card.answer;
      flashcardElement.classList.remove(`card_color_${colorName}`);
      flashcardElement.classList.add('card_color_white');
    }
  });

  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deck.cards = deck.cards.filter((deckCard) => deckCard.id !== card.id);
    flashcardElement.remove();
  });

  return flashcardElement;
}

function renderFlashcardEl(card, deck) {
  const flashcardEl = createFlashcardEl(card, deck);
  deckCardList.appendChild(flashcardEl);
}

export function renderDeckView(deck, updateCurrentDeck) {
  updateCurrentDeck(deck); // Update the currentDeck variable in index.js
  
  deckTitle.textContent = deck.name;
  deckCardList.innerHTML = '';
  deck.cards.forEach((card) => renderFlashcardEl(card, deck));

  homeSection.style.display = 'none';
  carouselSection.style.display = 'none';
  deckSection.style.display = 'block';
  notFoundSection.style.display = 'none';
}