let pokemonData = [];
let pokemonDataCard = [];
let evoData = [];
let dataOffset = 0;
let currentId = 0;
let pokemonSearch = [];


/**
 * Loads Pokemon tiles with loading spinner
 */
async function init() {
    toggleLoadingSpinner(true);
    await loadPokemonTiles();
    renderPokemonTiles(pokemonData, dataOffset);
    toggleLoadingSpinner(false);
}


/**
 * - Loads the card with spinner
 * - If called by shownav, spinner is deactivated
 * @param {number} index - index of current Pokemon
 * @param {boolean} card - if true show loading spinner
 */
async function showCard(index, card) {
    if (!card) { toggleLoadingSpinner(true); }
    currentId = index;
    await loadPokemonCard(index)
    renderCard(index);
    if (!card) { toggleLoadingSpinner(false); }
    document.getElementById('card-container').classList.remove('d-none');
}


/**
 * - Fetches data from PokeApi and pushes it into global json
 * - loading limit of 25 Pokemon at once
 */
async function loadPokemonTiles() {
    for (let i = 1 + dataOffset; i <= 25 + dataOffset; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        let name = responseAsJson['name']
        let sprite = responseAsJson['sprites']['other']['official-artwork']['front_default']
        let types = getType(responseAsJson['types']);
        let pokeId = responseAsJson['id'];
        let jsonPokeData = { 'name': name, 'sprite': sprite, 'types': types, 'id': pokeId };
        pokemonData.push(jsonPokeData);
    }
}


/**
 * Gets data from the PokeApi and pushes it into global json
 * @param {number} index - index of current Pokemon
 */
async function loadPokemonCard(index) {
    pokemonDataCard = [];
    let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${index + 1}`;
    let responseSpecies = await fetch(urlSpecies);
    let responseAsJsonSpecies = await responseSpecies.json();
    let urlCard = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
    let responseCard = await fetch(urlCard);
    let responseAsJsonCard = await responseCard.json();

    let species = responseAsJsonSpecies['genera'][7].genus;
    let flavorText = responseAsJsonSpecies['flavor_text_entries'][11]['flavor_text'];
    let moves = getMoves(responseAsJsonCard['moves']);
    let abilities = getAbilities(responseAsJsonCard['abilities']);
    let height = (responseAsJsonCard['height'] / 10).toFixed(1);
    let weight = (responseAsJsonCard['weight'] / 10).toFixed(1);
    let stats = getStats((responseAsJsonCard)['stats']);
    await loadEvo(getId(responseAsJsonSpecies.evolution_chain.url));

    let jsonPokeDataCard = {
        'species': species, 'flavortext': flavorText,
        'moves': moves, 'height': height, 'weight': weight,
        'abilities': abilities, 'stats': stats
    };
    pokemonDataCard.push(jsonPokeDataCard)
}


/**
 * Changes the first letter into capital
 * @param {string} name - gets given string
 * @returns  string with the first letter as capital
 */
function firstLetterToCapital(name) {
    let str = name;
    let modStr = str[0].toUpperCase() + str.slice(1);

    return modStr;
}



/**
 * retrieves moves from the given json and returns them in an array
 * @param {object} data - object with dataset of moves
 * @returns array containing all moves
 */
function getMoves(data) {
    let moves = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        moves.push(element['move']['name'])
    }
    return moves
}


/* retrieves type from the given json */
function getType(data) {
    let types = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        types.push(element['type']['name'])
    }

    return types
}

/* activates and deactivates the loading spinner */
function toggleLoadingSpinner(state) {
    if (state == true) {
        document.getElementById('spinner').classList.remove('d-none')
    } else {
        document.getElementById('spinner').classList.add('d-none')
    }
}


/* this function closes the card by clicking outside of it */
function closeCard() {
    document.getElementById('card-container').classList.add('d-none');
    currentId = 0;
}


/* retrieves the abilities from given json */
function getAbilities(data) {
    let firstAbilities = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        firstAbilities.push(element['ability']['name']);
    }
    return firstAbilities
}

/* retrieves the stats from given json */
function getStats(data) {
    let stats = [];
    for (let i = 0; i < data.length; i++) {
        const statpoints = data[i];
        let value = statpoints['base_stat'];
        let basestat = statpoints['stat']['name'];
        value = value.toString();
        basestat = firstLetterToCapital(basestat);
        let statsJson = { 'value': value, 'basestat': basestat };
        stats.push(statsJson);
    }
    return stats;
}

/* returns the total amount of statpoints */
function totalStats() {
    let statsData = pokemonDataCard[0]['stats'];
    let statsTotal = 0;
    for (let i = 0; i < statsData.length; i++) {
        const statsValue = Number(statsData[i]['value']);
        statsTotal += statsValue;
    }
    return statsTotal
}


/* calculates the width of the statbar; baseStat: looking for the Hp value; state: looking for the total value */
function getStatbarWidth(value, baseStat, state) {
    if (baseStat === 'Hp') {
        let statWidth = Number((100 / 255) * value);
        return statWidth;
    } else if (state === true) {
        let statWidth = Number((100 / 780) * value);
        return statWidth;
    } else {
        let statWidth = Number((100 / 154) * value);
        return statWidth;
    }
}


/* gets the evolution data from the PokeApi */
async function loadEvo(index) {
    let url = `https://pokeapi.co/api/v2/evolution-chain/${index}/`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    evoData = [];
    pushEvo(responseAsJson.chain.species);

    if (responseAsJson.chain.evolves_to.length > 0) {
        pushEvo(responseAsJson.chain.evolves_to[0].species);

        if (responseAsJson.chain.evolves_to[0].evolves_to.length > 0) {
            pushEvo(responseAsJson.chain.evolves_to[0].evolves_to[0].species);
        }
    }
}


/* pushes the evolution data (name, id, sprite) into the evolution json */
function pushEvo(data) {
    let name = data.name;
    let id = getId(data.url)
    let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    let evoJson = { 'name': name, 'id': id, 'sprite': sprite }

    evoData.push(evoJson);
}


/* gets the id from the given url */
function getId(link) {
    return link.slice(-5).replace(/\D/g, '');
}


/* activates or deactivates the active effect on the card nav */
function activateNav(id) {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`nav${i}`).classList.remove('nav-active')
    }
    document.getElementById(`nav${id}`).classList.add('nav-active')
}


/* show the next pokemon in card */
function nextPokemon(id) {
    if (id == 25) {
        return
    } else if (id == dataOffset) {
        return
    }
    showCard(id,true);
}


/* show the previous pokemon in card */
function previousPokemon(id) {
    if (id == 1) {
        return
    }
    showCard(id - 2,true);
}


function searchPokemon(){
    let searchValue = document.getElementById('search').value;

    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];

        if (pokemonData[i].name.indexOf(searchValue) !== -1) {
            pokemonSearch.push(pokemon);
        }

    }
    renderPokemonSearch(pokemonSearch);
    pokemonSearch=[];
}