import { gallery, getcardByID } from "./gallery.js";
import { hexToString } from "./colorMap.js";
import { renderCarouselView } from './carousel.js';

const cardList = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card-template').content;

const homeSection = document.querySelector('#home');
const carouselSection = document.querySelector('#carousel-view');
const notFoundSection = document.querySelector('#not-found');
const mainContent = document.querySelector('.page__main-content');

function createcardEl(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const titleEl = cardElement.querySelector('.card__title');
  const countEl = cardElement.querySelector('.card__count');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');
  const cardLink = cardElement.querySelector('.card__link');

  titleEl.textContent = item.name;
  countEl.textContent = `${item.cards.length} cards`;
  cardLink.href = `#carousel/${item.id}`; 

  const colorName = hexToString(item.color);
  cardElement.classList.remove('card_color_green');
  cardElement.classList.add(`card_color_${colorName}`);
  
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cardElement.remove();
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
    carouselSection.style.display = 'none';
    notFoundSection.style.display = 'none';
  } 
  else if (hash.startsWith('#carousel/')) {
    const cardId = hash.split('/')[1];
    const card = getcardByID(cardId);

    if (card) {
      homeSection.style.display = 'none';
      notFoundSection.style.display = 'none';
      carouselSection.style.display = 'flex';
      
      mainContent.classList.add('page__main-content_location_carousel');
      
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
  homeSection.style.display = 'none';
  carouselSection.style.display = 'none';
  notFoundSection.style.display = 'block';
}

gallery.forEach(rendercardEl);
window.addEventListener('hashchange', handleRouting);
handleRouting();