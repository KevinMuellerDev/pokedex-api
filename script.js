let pokemonData = []
let dataOffset = 0;
let currentPokemon;

async function init() {
    await loadPokemon();
    renderPokemonTiles(pokemonData,dataOffset);
}

async function loadPokemon() {
    for (let i = 1 + dataOffset; i <= 25 + dataOffset; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        let name = responseAsJson['name']
        let sprite = responseAsJson['sprites']['other']['official-artwork']['front_default']
        let types = getType(responseAsJson['types']);
        let jsonPokeData = { 'name': name, 'sprite': sprite, 'types': types };
        pokemonData.push(jsonPokeData);
    }
    //console.log(responseAsJson);
}

async function showMore() {
    await loadPokemon();
    renderPokemonTiles(pokemonData,dataOffset);
}

function firstLetterToCapital(name) {
    let str = name;
    let modStr = str[0].toUpperCase() + str.slice(1);

    return modStr;
}

function getType(data) {
    let types = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        types.push(element['type']['name'])
    }

    return types
}