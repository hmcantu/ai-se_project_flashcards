import { hexToString } from './colorMap.js';

const carouselTitle = document.querySelector('.carousel__title');
const cardElement = document.querySelector('.carousel__card');
const cardText = document.querySelector('.carousel__card-text');
const btnLeft = document.querySelector('.carousel__btn_type_left');
const btnRight = document.querySelector('.carousel__btn_type_right');
const btnFlip = document.querySelector('.carousel__btn_type_flip');

let currentIndex = 0;
let currentcard = null;
let showingQuestion = true;

export function renderCarouselView(card) {
  currentcard = card;
  currentIndex = 0;
  showingQuestion = true;
  updateDisplay();
}

function updateDisplay() {
  const card = currentcard.cards[currentIndex];
  const colorName = hexToString(currentcard.color);

  if (showingQuestion) {
    cardText.textContent = card.question;
    cardElement.className = 'carousel__card'; 
    cardElement.classList.add(`carousel__card_color_${colorName}`);
  } else {
    cardText.textContent = card.answer;
    cardElement.className = 'carousel__card'; 
    cardElement.classList.add('carousel__card_color_white');
  }
  
  carouselTitle.textContent = `${currentcard.name} • ${currentIndex + 1} / ${currentcard.cards.length}`;

  btnLeft.disabled = (currentIndex === 0);
  btnRight.disabled = (currentIndex === currentcard.cards.length - 1);
  
  btnLeft.classList.toggle('carousel__btn_disabled', btnLeft.disabled);
  btnRight.classList.toggle('carousel__btn_disabled', btnRight.disabled);
}

btnFlip.addEventListener('click', () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
});

btnLeft.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showingQuestion = true;
    updateDisplay();
  }
});

btnRight.addEventListener('click', () => {
  if (currentIndex < currentcard.cards.length - 1) {
    currentIndex++;
    showingQuestion = true;
    updateDisplay();
  }
});