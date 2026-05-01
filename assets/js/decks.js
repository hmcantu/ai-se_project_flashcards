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