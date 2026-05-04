export const fetchedDecks = [];

/**
 * Retrieves a deck object by its ID from the fetchedDecks array.
 * Note the change from .id to ._id to match the database schema.
 *
 * @param {string} deckId - The unique identifier of the deck to retrieve
 * @returns {object|undefined} The deck object if found, undefined otherwise
 */
export function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

/**
 * Removes a deck from the global fetchedDecks array by searching for its _id.
 * @param {string} deckId - The unique ID of the deck to be removed.
 * @returns {void}
 */
export function removeDeckById(deckId) {
  const index = fetchedDecks.findIndex((deck) => deck._id === deckId);
  if (index !== -1) {
    fetchedDecks.splice(index, 1);
  }
}