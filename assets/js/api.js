const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

// Hard-coding the header string to rule out template literal errors
const headers = {
  "Content-Type": "application/json",
  "Authorization": "019de566-659e-7529-bc71-32ec5ada94be"
};

/**
 * Processes the server response; returns JSON if successful, otherwise rejects the promise.
 * @param {Response} res - The response object from the fetch API.
 * @returns {Promise<any>} A promise that resolves to the parsed JSON or rejects with an error message.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks from the remote API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of deck objects.
 */
export function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers })
    .then(processResponse);
}

/**
 * Fetches a single deck by its unique ID.
 * @param {string} id - The unique ID of the deck to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the specific deck object.
 */
export function getDeckById(id) {
  return fetch(`${baseUrl}/decks/${id}`, { headers })
    .then(processResponse);
}

/**
 * Deletes a deck from the server.
 * @param {string} id - The unique ID of the deck to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the server confirmation.
 */
export function deleteDeck(id) {
  return fetch(`${baseUrl}/decks/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

/**
 * Creates a new deck on the server.
 * @param {Object} deckData - An object containing the name, color, and cards array for the new deck.
 * @returns {Promise<Object>} A promise that resolves to the newly created deck object.
 */
export function addDeck(deckData) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(deckData),
  }).then(processResponse);
}

/**
 * Deletes a specific card from a deck.
 * @param {string} cardId - The unique ID of the card to delete.
 * @returns {Promise<Object>} A promise that resolves to the server response.
 */
export function deleteCard(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

/**
 * Adds a new card to a specific deck.
 * @param {string} deckId - The ID of the deck to add the card to.
 * @param {Object} cardData - Object containing { question, answer }.
 * @returns {Promise<Object>} A promise that resolves to the newly created card.
 */
export function addCard(deckId, cardData) {
  return fetch(`${baseUrl}/cards/${deckId}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(cardData),
  }).then(processResponse);
}

/**
 * Updates an existing card's content.
 * @param {string} cardId - The unique ID of the card to update.
 * @param {Object} cardData - Object containing the updated { question, answer }.
 * @returns {Promise<Object>} A promise that resolves to the updated card.
 */
export function updateCard(cardId, cardData) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(cardData),
  }).then(processResponse);
}