const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

// Hard-coding the header string to rule out template literal errors
const headers = {
  "Content-Type": "application/json",
  "Authorization": "019de566-659e-7529-bc71-32ec5ada94be"
};

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers })
    .then(processResponse);
}

export function getDeckById(id) {
  return fetch(`${baseUrl}/decks/${id}`, { headers })
    .then(processResponse);
}