import { loadPokemons, POKEMON_CACHE } from './pokemonAPI.js';
import {
    pokemonList,
    convertPokemonToHtml,
    detailPokemon,
    detailsSeletor,
    updateUnderline,
    initializeDetailsMenu,
    renderAbout,
    renderStats
} from './pokemonDOM.js';

const limit = 16;
let offset = 0;
const POKEBALL_ANIMATION_DURATION = 500;
let currentPokemonData = null;

const pokeball = document.querySelector('.pokeball');
const pokemonContainer = document.querySelector('.pokemons');

function initLoadPokemons() {
  loadPokemons(offset, limit)
      .then(pokemons => {
          pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('');
      });
}

document.querySelector('.show-more').addEventListener('click', () => {
  offset += limit;
  initLoadPokemons();
});

pokemonContainer.addEventListener('click', (event) => {
  const pokemonCard = event.target.closest('.pokemon');
  if (!pokemonCard) return;

  const pokemonName = pokemonCard.querySelector('.name').textContent.toLowerCase();

  if(currentPokemonData && currentPokemonData.name === pokemonName) return;

  if (pokeball.classList.contains('open')) {
      pokeball.classList.remove('open');
      pokeball.classList.add('close');
  }

  setTimeout(() => {
      const data = POKEMON_CACHE[pokemonName];
      if (data) {
          detailPokemon(data);
          currentPokemonData = data;

          renderAbout(currentPokemonData);
          updateUnderline(detailsSeletor.querySelector('button'));
      }

      pokeball.classList.remove('close');
      pokeball.classList.add('open');
  }, POKEBALL_ANIMATION_DURATION);
});

detailsSeletor.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('button');

  if (clickedButton && currentPokemonData) {
      updateUnderline(clickedButton);

      const tabName = clickedButton.textContent.trim();

      switch(tabName){
        case 'About':
          renderAbout(currentPokemonData);
          break;
        case 'Base Stats':
          renderStats(currentPokemonData);
          break;
      }
  }
});

initLoadPokemons();
window.addEventListener('load', initializeDetailsMenu);