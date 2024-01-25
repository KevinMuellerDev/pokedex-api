let pokemonData = [];
let pokemonDataCard = [];
let dataOffset = 0;
let currentPokemon;

async function init() {
    toggleLoadingSpinner(true);
    await loadPokemonTiles();
    renderPokemonTiles(pokemonData, dataOffset);
    toggleLoadingSpinner(false);
}


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
        console.log(responseAsJson);
    }
}


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
    console.log(stats);

    let jsonPokeDataCard = {
        'species': species, 'flavortext': flavorText,
        'moves': moves, 'height': height, 'weight': weight,
        'abilities': abilities, 'stats': stats
    };
    pokemonDataCard.push(jsonPokeDataCard)
}


function firstLetterToCapital(name) {
    let str = name;
    let modStr = str[0].toUpperCase() + str.slice(1);

    return modStr;
}


function getMoves(data) {
    let moves = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        moves.push(element['move']['name'])
    }
    return moves
}

function getType(data) {
    let types = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        types.push(element['type']['name'])
    }

    return types
}

function toggleLoadingSpinner(state) {
    if (state == true) {
        document.getElementById('spinner').classList.remove('d-none')
    } else {
        document.getElementById('spinner').classList.add('d-none')
    }
}

async function showCard(index) {
    toggleLoadingSpinner(true);
    await loadPokemonCard(index)
    renderCard(index);
    toggleLoadingSpinner(false);
    document.getElementById('card-container').classList.remove('d-none');
}

function closeCard() {
    document.getElementById('card-container').classList.add('d-none');
}

function getAbilities(data) {
    let firstAbilities = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        firstAbilities.push(element['ability']['name']);
    }
    return firstAbilities
}

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
function totalStats() {
    let statsData = pokemonDataCard[0]['stats'];
    console.log(statsData)
    let statsTotal = 0;
    for (let i = 0; i < statsData.length; i++) {
        const statsValue = Number(statsData[i]['value']);
        statsTotal += statsValue;
    }
    return statsTotal
}

function getStatbarWidth(value, state) {
    if (state===true) {
        let statWidth = Number((100 / 780) * value);
        return statWidth;
    }else{
        let statWidth = Number((100 / 154) * value);
        return statWidth;
    }
}