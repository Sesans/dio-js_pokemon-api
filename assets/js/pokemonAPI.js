export const POKEMON_CACHE = {};
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function loadPokemons(offset, limit) {
  return fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
      return Promise.all(promises);
    })
    .then(pokemons => {
      pokemons.forEach(pokemon => {
        POKEMON_CACHE[pokemon.name] = pokemon;
      });
      return pokemons;
    });
}