const BASE_URL = 'https://api.thedogapi.com/v1';

export function getBreedInfo(breed) {
    return fetch(`${BASE_URL}/breeds/search?q=${breed}`)
    .then(res => res.json());
}

export function getAllBreeds() {
    return fetch(`${BASE_URL}/breeds`)
    .then(res => res.json());
}