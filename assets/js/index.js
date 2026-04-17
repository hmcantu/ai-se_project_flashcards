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
const pageElement = document.querySelector('.page');

const practiceBtn = deckSection.querySelector('.gallery__practice-btn');

/**
 * Utility to manage view visibility
 */
function showView(currentSection, displayValue) {
  const sections = [homeSection, deckSection, carouselSection, notFoundSection];
  
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  currentSection.style.display = displayValue;
}

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
  pageElement.classList.remove('page_no-mobile-bar');

  if (hash === '#home' || hash === '') {
    showView(homeSection, 'flex');
    updateMobileBar('home');
  } 
  else if (hash.startsWith('#deck/')) {
    const deckId = hash.split('/')[1];
    const deck = getcardByID(deckId);

    if (deck) {
      showView(deckSection, 'flex');
      renderDeckView(deck, updateCurrentDeck);
      updateMobileBar('deck');
    } else {
      show404();
    }
  }
  else if (hash.startsWith('#carousel/')) {
    const cardId = hash.split('/')[1];
    const card = getcardByID(cardId);

    if (card) {
      showView(carouselSection, 'flex');
      mainContent.classList.add('page__main-content_location_carousel');
      pageElement.classList.add('page_no-mobile-bar');
      renderCarouselView(card);
    } else {
      show404();
    }
  } 
  else {
    show404();
  }
}

function show404() {
  showView(notFoundSection, 'block');
  pageElement.classList.add('page_no-mobile-bar');
}

practiceBtn.addEventListener('click', () => {
  if (currentDeck) {
    location.hash = `#carousel/${currentDeck.id}`;
  }
});

document.querySelector('.gallery__practice-btn--mobile').addEventListener('click', () => {
  if (currentDeck) {
    location.hash = `#carousel/${currentDeck.id}`;
  }
});

gallery.forEach(rendercardEl);
window.addEventListener('hashchange', handleRouting);
handleRouting();