import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

const errorModal = document.querySelector("#error-modal");
const errorMsgElement = document.querySelector("#error-message");
const closeErrorBtn = document.querySelector("#close-error-modal");

closeErrorBtn.addEventListener("click", () => {
  errorModal.classList.remove("modal_opened");
});

/**
 * Displays an error message using the modal.
 * @param {string} message - The error message to display to the user.
 * @returns {void}
 */
function showError(message) {
  errorMsgElement.textContent = message;
  errorModal.classList.add("modal_opened");
}

/**
 * Validates that the deck name is a string between 2 and 80 characters.
 * @param {string} name - The name to be validated.
 * @returns {string|null} The validated name string, or null if invalid.
 */
function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Attempts to parse a string into a JSON object.
 * @param {string} jsonString - The string to parse.
 * @returns {Object|Array|null} The parsed JSON data or null if parsing fails.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Maps a selection color name to a specific hex code.
 * @param {string} color - The color name from the form (e.g., "blue").
 * @returns {string} The corresponding hex color code.
 */
function normalizeColor(color) {
  const colorMap = {
    green: "#64d583",
    blue: "#91A8F9",
    purple: "#aa8ef0",
    pink: "#EE92D7",
    orange: "#ee955e",
    yellow: "#f5d770"
  };
  return colorMap[color] || "#64d583";
}

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");

/**
 * Enables the form submit button by setting disabled to false.
 * @returns {void}
 */
export function enableSubmitBtn() {
  if (submitBtn) {
    submitBtn.disabled = false;
  }
}

newDeckForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());
  const colorValue = normalizeColor(values.color);

  const jsonData = parseJSON(values.cards);
  if (!jsonData) {
    return showError("Invalid JSON syntax. Please check your formatting.");
  }

  const validatedName = validateName(values.name);
  if (!validatedName) {
    return showError("Name must be a string between 2 and 80 characters.");
  }

  // FIX: Support both { "cards": [] } AND raw [{}, {}]
  const cardsArray = Array.isArray(jsonData) ? jsonData : jsonData.cards;

  if (!Array.isArray(cardsArray)) {
    return showError("The JSON must be an array of cards or contain a 'cards' field.");
  }

  const newDeckData = {
    name: validatedName,
    color: colorValue,
    cards: cardsArray,
  };

  addDeck(newDeckData)
    .then((newDeckFromServer) => {
      fetchedDecks.push(newDeckFromServer);
      // Navigate to the new deck view
      window.location.hash = "#deck/" + newDeckFromServer._id;
      e.target.reset();
      submitBtn.disabled = true; // Re-disable after success
    })
    .catch((err) => {
      showError("Failed to save the deck. Check your internet connection or JSON structure.");
      console.error(err);
    });
});

const nameInput = newDeckForm.querySelector('input[name="name"]');
const textArea = newDeckForm.querySelector('textarea[name="cards"]');
const colorInputs = newDeckForm.querySelectorAll('input[name="color"]');

/**
 * Checks form inputs and enables/disables the submit button based on validity.
 * @returns {void}
 */
const handleFormInput = () => {
  if (nameInput.value.trim().length >= 2 && textArea.value.trim().length > 0) {
    enableSubmitBtn();
  } else {
    submitBtn.disabled = true;
  }
};

nameInput.addEventListener("input", handleFormInput);
textArea.addEventListener("input", handleFormInput);
colorInputs.forEach((input) => {
  input.addEventListener("change", handleFormInput);
});