const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/animalsOwned/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/animalsOwned`).then(e => e.json())
  }
}