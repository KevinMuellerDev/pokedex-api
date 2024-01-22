let pokemonData =[]
let currentPokemon;

async function init(){
    await loadPokemon();
    renderPokemonTiles(pokemonData);
}

async function loadPokemon() {
    for (let i = 1; i <= 25; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        let name = responseAsJson['name']
        let sprite = responseAsJson['sprites']['other']['official-artwork']['front_default']
        let types = getType(responseAsJson['types']); 
        let jsonPokeData = {'name':name, 'sprite':sprite, 'types':types};
        pokemonData.push(jsonPokeData);
    }
    //console.log(responseAsJson);
}

function firstLetterToCapital(name) {
    let str = name;
    let modStr = str[0].toUpperCase() + str.slice(1);
    
    return modStr;
}

function getType(data){
    let types = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        types.push(element['type']['name'])
    }

    return types
}