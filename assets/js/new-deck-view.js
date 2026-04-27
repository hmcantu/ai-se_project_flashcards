import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

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

export function disableSubmitBtn() {
  if (submitBtn) {
    submitBtn.disabled = false;
  }
}

newDeckForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());

  try {
    const jsonData = JSON.parse(values.cards);
    const id = `${slugify(values.name)}-${Date.now()}`;

    const newDeck = {
      id: id,
      name: values.name,
      color: normalizeColor(values.color),
      cards: jsonData.cards,
    };

    decks.push(newDeck);
    window.location.hash = "deck/" + id;
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert("Invalid JSON format.");
  }
});