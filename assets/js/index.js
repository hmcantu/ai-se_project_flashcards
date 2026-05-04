import { hexToString } from "./colorMap.js";
import { renderCarouselView } from './carousel.js';
import { renderDeckView } from './deck-view.js';
import { openModal } from './modal.js';
import { enableSubmitBtn } from "./new-deck-view.js";
import { getDecks, getDeckById, deleteDeck } from "./api.js";
import { fetchedDecks, getDeckByID, removeDeckById } from "./decks.js";

let currentCard = null; 

const cardList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const homeSection = document.querySelector('#home');
const deckSection = document.querySelector('#deck-view');
const carouselSection = document.querySelector('#carousel-view');
const notFoundSection = document.querySelector('#not-found');
const newDeckSection = document.querySelector('#new-deck-view');
const aboutSection = document.querySelector('#about');
const mainContent = document.querySelector('.page__main-content');
const pageElement = document.querySelector('.page');

const practiceBtn = deckSection?.querySelector('.gallery__practice-btn');

/**
 * UTILS
 */

/**
 * Toggles the visibility of page sections by hiding all and showing the target.
 * @param {HTMLElement} currentSection - The DOM element of the section to display.
 * @param {string} displayValue - The CSS display value (e.g., 'flex', 'block').
 */
function showView(currentSection, displayValue) {
  const sections = [homeSection, deckSection, carouselSection, notFoundSection, newDeckSection, aboutSection];
  sections.forEach((section) => {
    if (section) section.style.display = 'none';
  });
  if (currentSection) currentSection.style.display = displayValue;
}

/**
 * Updates the mobile navigation bar UI based on the current active view.
 * @param {string} view - The name of the view (e.g., 'home', 'deck').
 */
function updateMobileBar(view) {
  const mobileNewCardBtn = document.querySelector('.gallery__new-card-btn--mobile');
  const deckViewModifier = 'gallery__new-card-btn_location_deck-view';

  if (!mobileNewCardBtn) return;

  if (view === 'deck') {
    mobileNewCardBtn.classList.add(deckViewModifier);
  } else {
    mobileNewCardBtn.classList.remove(deckViewModifier);
  }
}

/**
 * Updates the globally tracked current card/deck object.
 * @param {Object} deck - The deck object to set as current.
 */
const updateCurrentCard = (deck) => {
  currentCard = deck;
};

/**
 * Displays an error message to the user via a modal.
 * @param {string} message - The error message to display.
 */
export function showError(message) {
  const errorModal = document.querySelector('#error-modal');
  const errorMessage = document.querySelector('#error-message');
  const closeBtn = document.querySelector('#close-error-modal');

  if (errorModal && errorMessage) {
    errorMessage.textContent = message;
    errorModal.classList.add('modal_opened');

    closeBtn.addEventListener('click', () => {
      errorModal.classList.remove('modal_opened');
    }, { once: true });
  }
}

/**
 * RENDERING
 */

/**
 * Creates and configures a deck card DOM element from a template.
 * @param {Object} item - The deck data object.
 * @returns {HTMLElement} The populated card element.
 */
function createCardEl(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const titleEl = cardElement.querySelector('.card__title');
  const countEl = cardElement.querySelector('.card__count');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');
  const cardLink = cardElement.querySelector('.card__link');

  titleEl.textContent = item.name;
  countEl.textContent = `${item.cards.length} cards`;
  cardLink.href = `#deck/${item._id}`;

  const colorName = hexToString(item.color);
  cardElement.classList.add(`card_color_${colorName}`);
  
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    console.log("Delete button clicked for:", item.name);
    
    openModal(() => {
      deleteDeck(item._id)
        .then(() => {
          // UI update
          cardElement.remove();
          removeDeckById(item._id); 
        })
        .catch((err) => {
          showError("Failed to delete the deck.");
          console.error(err);
        });
    });
  });

  cardElement.addEventListener('click', (e) => {
    if (e.target.closest('.card__delete-btn')) return;
    location.hash = `#deck/${item._id}`;
  });

  return cardElement;
}

/**
 * Fetches decks from the API and renders them in the gallery list.
 */
function renderHomeView() {
  if (!cardList) return;
  cardList.innerHTML = ""; 
  
  getDecks()
    .then((decks) => {
      fetchedDecks.length = 0;
      fetchedDecks.push(...decks);

      decks.forEach((item) => {
        const cardEl = createCardEl(item);
        cardList.append(cardEl);
      });
    })
    .catch((err) => {
      showError("Can't fetch decks");
      console.error(err);
    })
    .finally(() => {
      handleRouting();
    });
}

/**
 * ROUTING
 */

/**
 * Main router function that handles view transitions based on the URL hash.
 * @returns {Promise<void>}
 */
async function handleRouting() {
  const hash = location.hash;
  mainContent?.classList.remove('page__main-content_location_carousel');
  pageElement?.classList.remove('page_no-mobile-bar');

  if (hash === '#home' || hash === '' || hash === '#') {
    showView(homeSection, 'flex');
    updateMobileBar('home');
  } 
  /* ADDED ABOUT SECTION LOGIC */
  else if (hash === '#about') {
    showView(aboutSection, 'block');
  }
  /* ------------------------- */
  else if (hash === '#new-deck-view' || hash === '#new-deck') {
    showView(newDeckSection, 'block');
    pageElement?.classList.add('page_no-mobile-bar');
  }
  else if (hash.startsWith('#deck/')) {
    const deckId = hash.split('/')[1];
    const deck = getDeckByID(deckId);
    
    if (deck) {
      showView(deckSection, 'flex');
      renderDeckView(deck, updateCurrentCard);
      updateMobileBar('deck');
    } else {
      show404();
    }
  }
  else if (hash.startsWith('#carousel/') || hash.startsWith('#practice/')) {
    const cardId = hash.split('/')[1];
    const card = getDeckByID(cardId);

    if (card) {
      showView(carouselSection, 'flex');
      mainContent?.classList.add('page__main-content_location_carousel');
      pageElement?.classList.add('page_no-mobile-bar');
      renderCarouselView(card);
    } else {
      show404();
    }
  } 
  else {
    show404();
  }
}

/**
 * Displays the 404 Not Found section.
 */
function show404() {
  showView(notFoundSection, 'block');
  pageElement?.classList.add('page_no-mobile-bar');
}

/**
 * EVENTS
 */

practiceBtn?.addEventListener('click', () => {
  if (currentCard) {
    location.hash = `#carousel/${currentCard._id}`;
  }
});

const mobilePracticeBtn = document.querySelector('.gallery__practice-btn--mobile');
mobilePracticeBtn?.addEventListener('click', () => {
  if (currentCard) {
    location.hash = `#carousel/${currentCard._id}`;
  }
});

const homeNewCardBtn = document.querySelector('#home .gallery__new-card-btn');
homeNewCardBtn?.addEventListener('click', () => {
  location.hash = '#new-deck-view';
});

window.addEventListener('hashchange', handleRouting);

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderHomeView();
});