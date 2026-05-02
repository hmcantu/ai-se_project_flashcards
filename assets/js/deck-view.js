import { hexToString } from "./colorMap.js";
import { openModal } from './modal.js';
import { deleteCard, addCard, updateCard } from "./api.js";
import { showError } from "./index.js";

const deckSection = document.querySelector('#deck-view');
const deckTitle = deckSection.querySelector('.gallery__title');
const deckCardList = deckSection.querySelector('.gallery__list');
const flashcardTemplate = document.querySelector('#flashcard-template').content;

/**
 * Creates an inline form to add or edit a card.
 * @param {Object} deck - The current deck object.
 * @param {Object} [initialData] - Existing card data if editing.
 * @param {HTMLElement} [originalElement] - The element to replace if editing.
 * @returns {HTMLElement} The form element.
 */
function createCardForm(deck, initialData = null, originalElement = null) {
  const formEl = document.createElement('li');
  formEl.className = `card card_type_form card_color_${hexToString(deck.color)}`;
  
  const isEditing = !!initialData;

  formEl.innerHTML = `
    <form class="card__form">
      <div class="card__form-container">
        <textarea name="question" class="card__input" placeholder="Question" required>${isEditing ? initialData.question : ''}</textarea>
        <textarea name="answer" class="card__input" placeholder="Answer" style="display: none;" required>${isEditing ? initialData.answer : ''}</textarea>
      </div>
      <div class="card__row">
        <button type="button" class="card__btn card__btn_type_flip" aria-label="Flip card"></button>
        <button type="submit" class="card__btn card__btn_type_check" aria-label="Save card"></button>
      </div>
    </form>
  `;

  const qInput = formEl.querySelector('textarea[name="question"]');
  const aInput = formEl.querySelector('textarea[name="answer"]');
  const flipBtn = formEl.querySelector('.card__btn_type_flip');
  const form = formEl.querySelector('form');

  // Flip logic within the form
  flipBtn.addEventListener('click', () => {
    const isShowingQuestion = qInput.style.display !== 'none';
    qInput.style.display = isShowingQuestion ? 'none' : 'block';
    aInput.style.display = isShowingQuestion ? 'block' : 'none';
    
    if (isShowingQuestion) {
      formEl.className = 'card card_type_form card_color_white';
    } else {
      formEl.className = `card card_type_form card_color_${hexToString(deck.color)}`;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardData = { question: qInput.value, answer: aInput.value };

    const apiCall = isEditing 
      ? updateCard(initialData._id, cardData) 
      : addCard(deck._id, cardData);

    apiCall
      .then((savedCard) => {
        const newCardEl = createFlashcardEl(savedCard, deck);
        formEl.replaceWith(newCardEl);
        
        // Update local data
        if (isEditing) {
          const index = deck.cards.findIndex(c => c._id === initialData._id);
          deck.cards[index] = savedCard;
        } else {
          deck.cards.push(savedCard);
        }
      })
      .catch((err) => {
        showError("Failed to save card.");
        console.error(err);
      });
  });

  return formEl;
}

/**
 * Creates a flashcard element with view, edit, and delete capabilities.
 */
function createFlashcardEl(card, deck) {
  const flashcardElement = flashcardTemplate.querySelector('.card').cloneNode(true);
  const titleEl = flashcardElement.querySelector('.card__title');
  const editBtn = flashcardElement.querySelector('.card__edit-btn');
  const deleteBtn = flashcardElement.querySelector('.card__delete-btn');

  const colorName = hexToString(deck.color);
  flashcardElement.classList.add(`card_color_${colorName}`);
  flashcardElement.dataset.flipped = 'false';
  titleEl.textContent = card.question;

  flashcardElement.addEventListener('click', () => {
    const flipped = flashcardElement.dataset.flipped === 'true';
    flashcardElement.dataset.flipped = String(!flipped);

    if (flipped) {
      titleEl.textContent = card.question;
      flashcardElement.className = `card card_color_${colorName}`;
    } else {
      titleEl.textContent = card.answer;
      flashcardElement.className = 'card card_color_white';
    }
  });

  editBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const editForm = createCardForm(deck, card, flashcardElement);
    flashcardElement.replaceWith(editForm);
  });

  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openModal(() => {
      deleteCard(card._id)
        .then(() => {
          flashcardElement.remove();
          deck.cards = deck.cards.filter((c) => c._id !== card._id);
        })
        .catch((err) => showError("Failed to delete card."));
    });
  });

  return flashcardElement;
}

/**
 * Renders the full deck view.
 */
export function renderDeckView(deck, updateCurrentDeck) {
  updateCurrentDeck(deck); 
  
  deckTitle.textContent = deck.name;
  deckCardList.innerHTML = '';
  deck.cards.forEach((card) => {
    const el = createFlashcardEl(card, deck);
    deckCardList.appendChild(el);
  });

  const addNewCardBtn = deckSection.querySelector('.gallery__new-card-btn_location_deck-view');
  addNewCardBtn.onclick = () => {
    const formEl = createCardForm(deck);
    deckCardList.appendChild(formEl);
    formEl.scrollIntoView({ behavior: 'smooth' });
  };
}