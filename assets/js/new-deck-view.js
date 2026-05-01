import { fetchedDecks } from "./decks.js";

const errorModal = document.querySelector("#error-modal");
const errorMsgElement = document.querySelector("#error-message");
const closeErrorBtn = document.querySelector("#close-error-modal");

closeErrorBtn.addEventListener("click", () => {
  errorModal.classList.remove("modal_visible");
});

function showError(message) {
  errorMsgElement.textContent = message;
  errorModal.classList.add("modal_visible");
}

function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeColor(color) {
  const colorMap = {
    green: "#64d583",
    blue: "#3b82f6",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    yellow: "#eab308"
  };
  return colorMap[color] || "#64d583";
}

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".new-deck-view__submit-btn");

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

  if (!Array.isArray(jsonData.cards)) {
    return showError("The 'cards' field must be an array.");
  }

  if (typeof jsonData.color === "string") {
    if (jsonData.color.toLowerCase() !== colorValue.toLowerCase()) {
      return showError(`The color in the JSON (${jsonData.color}) does not match the selected color (${colorValue}).`);
    }
  }

  const id = `${slugify(validatedName)}-${Date.now()}`;

  const newDeck = {
    id: id,
    name: validatedName,
    color: colorValue,
    cards: jsonData.cards,
  };

  fetchedDecks.push(newDeck);
  window.location.hash = "#deck/" + id;
  e.target.reset();
});