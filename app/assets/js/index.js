import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";
import { renderCarouselView } from './carousel.js';

const deckList = document.querySelector('.decks__list');
const deckTemplate = document.querySelector('#deck-template').content;

const homeSection = document.querySelector('#home');
const carouselSection = document.querySelector('#carousel-view');
const notFoundSection = document.querySelector('#not-found');
const mainContent = document.querySelector('.page__main-content');

function createDeckEl(item) {
  const deckElement = deckTemplate.querySelector('.deck').cloneNode(true);
  const titleEl = deckElement.querySelector('.deck__title');
  const countEl = deckElement.querySelector('.deck__count');
  const deleteBtn = deckElement.querySelector('.deck__delete-btn');
  const deckLink = deckElement.querySelector('.deck__link');

  titleEl.textContent = item.name;
  countEl.textContent = `${item.cards.length} cards`;
  deckLink.href = `#carousel/${item.id}`; 

  const colorName = hexToString(item.color);
  deckElement.classList.remove('deck_color_green');
  deckElement.classList.add(`deck_color_${colorName}`);
  
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    deckElement.remove();
  });

  return deckElement;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

function handleRouting() {
  const hash = location.hash;

  mainContent.classList.remove('page__main-content_location_carousel');

  if (hash === '#home' || hash === '') {
    homeSection.style.display = 'flex';
    carouselSection.style.display = 'none';
    notFoundSection.style.display = 'none';
  } 
  else if (hash.startsWith('#carousel/')) {
    const deckId = hash.split('/')[1];
    const deck = getDeckByID(deckId);

    if (deck) {
      homeSection.style.display = 'none';
      notFoundSection.style.display = 'none';
      carouselSection.style.display = 'flex';
      
      mainContent.classList.add('page__main-content_location_carousel');
      
      renderCarouselView(deck);
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
  carouselSection.style.display = 'none';
  notFoundSection.style.display = 'block';
}

decks.forEach(renderDeckEl);
window.addEventListener('hashchange', handleRouting);
handleRouting();