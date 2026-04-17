import { gallery, getcardByID } from "./gallery.js";
import { hexToString } from "./colorMap.js";
import { renderCarouselView } from './carousel.js';
import { renderDeckView } from './deck-view.js';

let currentDeck = null; 

const cardList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const homeSection = document.querySelector('#home');
const deckSection = document.querySelector('#deck-view');
const carouselSection = document.querySelector('#carousel-view');
const notFoundSection = document.querySelector('#not-found');
const mainContent = document.querySelector('.page__main-content');

const practiceBtn = deckSection.querySelector('.gallery__practice-btn');

/**
 * NEW: Helper to update the mobile bar state
 * @param {string} view - 'home', 'deck', or 'carousel'
 */
function updateMobileBar(view) {
  const mobileNewCardBtn = document.querySelector('.gallery__new-card-btn--mobile');
  const deckViewModifier = 'gallery__new-card-btn_location_deck-view';

  if (!mobileNewCardBtn) return; // Guard clause

  if (view === 'deck') {
    // Show side-by-side buttons
    mobileNewCardBtn.classList.add(deckViewModifier);
  } else {
    // Show single centered button
    mobileNewCardBtn.classList.remove(deckViewModifier);
  }
}

// Helper to allow deck-view.js to update currentDeck
const updateCurrentDeck = (deck) => {
  currentDeck = deck;
};

function createcardEl(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const titleEl = cardElement.querySelector('.card__title');
  const countEl = cardElement.querySelector('.card__count');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');
  const cardLink = cardElement.querySelector('.card__link');

  titleEl.textContent = item.name;
  countEl.textContent = `${item.cards.length} cards`;
  cardLink.href = `#deck/${item.id}`;

  const colorName = hexToString(item.color);
  cardElement.classList.add(`card_color_${colorName}`);
  
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cardElement.remove();
  });

  cardElement.addEventListener('click', (e) => {
    if (e.target.closest('.card__delete-btn')) return;
    location.hash = `#deck/${item.id}`;
  });

  return cardElement;
}

function rendercardEl(item) {
  const cardEl = createcardEl(item);
  cardList.prepend(cardEl);
}

function handleRouting() {
  const hash = location.hash;
  mainContent.classList.remove('page__main-content_location_carousel');

  if (hash === '#home' || hash === '') {
    homeSection.style.display = 'flex';
    deckSection.style.display = 'none';
    carouselSection.style.display = 'none';
    notFoundSection.style.display = 'none';
    
    // Reset mobile bar for Home View
    updateMobileBar('home');
  } 
  else if (hash.startsWith('#deck/')) {
    const deckId = hash.split('/')[1];
    const deck = getcardByID(deckId);

    if (deck) {
      renderDeckView(deck, updateCurrentDeck);
      // Activate mobile bar for Deck View
      updateMobileBar('deck');
    } else {
      show404();
    }
  }
  else if (hash.startsWith('#carousel/')) {
    const cardId = hash.split('/')[1];
    const card = getcardByID(cardId);

    if (card) {
      homeSection.style.display = 'none';
      deckSection.style.display = 'none';
      notFoundSection.style.display = 'none';
      carouselSection.style.display = 'flex';
      mainContent.classList.add('page__main-content_location_carousel');
      renderCarouselView(card);
      
      // Usually, we keep the bar same as home or hide it in carousel
      updateMobileBar('home'); 
    } else {
      show404();
    }
  } 
  else {
    show404();
  }
}

function show404() {
  homeSection.style.display = 'none';
  deckSection.style.display = 'none';
  carouselSection.style.display = 'none';
  notFoundSection.style.display = 'block';
  updateMobileBar('home');
}

// Global Listener (Set once)
practiceBtn.addEventListener('click', () => {
  if (currentDeck) {
    location.hash = `#carousel/${currentDeck.id}`;
  }
});

// Since the mobile practice button is a duplicate, we should add a listener to it too!
document.querySelector('.gallery__practice-btn--mobile').addEventListener('click', () => {
  if (currentDeck) {
    location.hash = `#carousel/${currentDeck.id}`;
  }
});

gallery.forEach(rendercardEl);
window.addEventListener('hashchange', handleRouting);
handleRouting();