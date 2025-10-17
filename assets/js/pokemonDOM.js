export const pokemonList = document.querySelector('.pokemons');
export const pokemonBanner = document.querySelector('.pokemon-banner');
export const pokemonDetail = document.querySelector('.pokemon-details-list');
export const detailsSeletor = document.querySelector('.details-seletor');
export const detailsButtons = detailsSeletor.querySelectorAll('button');
export const detailContentContainer = document.getElementById('detail-content-container');

const MAX_STAT_VALUE = 255; 

export function convertPokemonToHtml(pokemon) {
  const types = pokemon.types.map(t => `<li class="type" style="color: var(--color-${t.type.name})"> ${t.type.name}</li>`).join('');
  const image = pokemon.sprites.other['dream_world'].front_default;
  const mainType = pokemon.types[0].type.name;
  const colorVar = `var(--color-${mainType})`;

  return `
    <li class="pokemon" style="background-color: ${colorVar}">
      <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">${types}</ol>
        <img src="${image}" alt="${pokemon.name}">
      </div>
    </li>
  `;
}

export function detailPokemon(data) {
  const mainType = data.types[0].type.name;
  const colorVar = `var(--color-${mainType})`;
  const image = data.sprites.other['dream_world'].front_default;
  const types = data.types.map(t => `<li class="type" style="color: var(--color-${t.type.name})"> ${t.type.name}</li>`).join('');

  pokemonBanner.innerHTML = `
    <div class="pokemon-detail-card" style="background-color: ${colorVar}">
      <div class="number-name-detail">
      <span class="name">${data.name}</span>
        <span class="number">#${data.id.toString().padStart(3, '0')}</span>
      </div>
      <div class="detail">
          <ol class="types">${types}</ol>
          <img src="${image}" alt="${data.name}">
      </div>   
    </div>
  `;
}

export function updateUnderline(activeButton) {
  detailsButtons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');

  const buttonWidth = activeButton.offsetWidth;
  const buttonOffset = activeButton.offsetLeft;

  const UNDERLINE_REDUCTION = 20; 
  const underlineWidth = buttonWidth - UNDERLINE_REDUCTION;
  const underlineOffset = buttonOffset + (UNDERLINE_REDUCTION / 2);

  detailsSeletor.style.setProperty('--underline-width', `${underlineWidth}px`);
  detailsSeletor.style.setProperty('--underline-transform', `translateX(${underlineOffset}px)`);
}

export function initializeDetailsMenu() {
  const defaultButton = detailsButtons[0];
  defaultButton.classList.add('active');
  updateUnderline(defaultButton);
}

export function renderAbout(pokemon){
  const htmlContent = `
    <div class="about-info">
      <p>Species</p>
      <p>Height</p>
      <p>Weight</p>
      <p>Abilities</p>
    </div>
    <div class="about-values">
      <p>${pokemon.species.name}</p>
      <p>${(pokemon.height / 10).toFixed(1)} m</p>
      <p>${(pokemon.weight / 10).toFixed(1)} kg</p>
      <p>${pokemon.abilities.map(ab => ab.ability.name).join(', ')}</p>
    </div>
  `;
  detailContentContainer.innerHTML = htmlContent;
}

export function renderStats(pokemon){
  const mainType = pokemon.types[0].type.name;
  const colorVar = `var(--color-${mainType})`;  

  const statsHtml = pokemon.stats.map(stat => {
    const statsName = stat.stat.name.toUpperCase();
    const statsValue = stat.base_stat;
    const fillPercentage = Math.min((statsValue / MAX_STAT_VALUE) * 100, 100).toFixed(1);

  return `
    <div class="stat-row">
      <span class="stats-name">${statsName}</span>
        
      <div class="stat-bar-container" style="--stat-position: ${fillPercentage}%">
            <span class="stats-value">${statsValue}</span>
            
        <div class="stat-bar-fill" 
          style="width: ${fillPercentage}%; background-color: ${colorVar};">
          <div class="stat-bar-indicator"></div> 
        </div>
      </div>
    </div>
  `;
  }).join('');

  detailContentContainer.innerHTML = `<div class="base-stats">${statsHtml}</div>`;
}

export function renderEvolution(pokemon){
  
}