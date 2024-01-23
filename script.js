let pokemonData = []
let dataOffset = 0;
let currentPokemon;

async function init() {
    toggleLoadingSpinner(true);
    await loadPokemonTiles();
    renderPokemonTiles(pokemonData,dataOffset);
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
        let jsonPokeData = { 'name': name, 'sprite': sprite, 'types': types, 'id': pokeId};
        pokemonData.push(jsonPokeData);
    }
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

function toggleLoadingSpinner(state){
    if (state == true) {
        document.getElementById('spinner').classList.remove('d-none')
    }else{
        document.getElementById('spinner').classList.add('d-none')
    }
}

function showCard(index){
    document.getElementById('card-container').classList.remove('d-none');

}

function closeCard(){
    document.getElementById('card-container').classList.add('d-none');

}