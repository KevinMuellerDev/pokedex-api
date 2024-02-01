/**
 * This function gets the ids of the rendered elements to fill them with their
 * needed data and increment the offset at the end
 * @param {object} data - receiving current tile data
 * @param {number} dataOffs - receiving the index
 */
function renderPokemonTiles(data, dataOffs) {
    for (let i = 0 + dataOffs; i < data.length; i++) {
        const tile = data[i];

        document.getElementById('tiles-container').innerHTML += templateTile(i);
        document.getElementById(`tile${i}`).style.background = `var(--${tile.types[0]})`;
        document.getElementById(`pokemon-name${i}`).innerHTML = firstLetterToCapital(tile.name);
        document.getElementById(`pokemon-id${i}`).innerHTML = `#${tile.id}`;
        renderPokemonTileType(tile, i, 'tile');
        document.getElementById(`sprite${i}`).src = tile.sprite
        document.getElementById(`sprite${i}`).alt = tile.name
    }
    dataOffset += 25;
}


function renderPokemonSearch(data) {
    document.getElementById('tiles-container').innerHTML = '';

    for (let i = 0 ; i < data.length; i++) {
        const tile = data[i];

        document.getElementById('tiles-container').innerHTML += templateTile(i);
        document.getElementById(`tile${i}`).style.background = `var(--${tile.types[0]})`;
        document.getElementById(`pokemon-name${i}`).innerHTML = firstLetterToCapital(tile.name);
        document.getElementById(`pokemon-id${i}`).innerHTML = `#${tile.id}`;
        renderPokemonTileType(tile, i, 'tile');
        document.getElementById(`sprite${i}`).src = tile.sprite
        document.getElementById(`sprite${i}`).alt = tile.name
    }
}



/**
 * This function gets the id of the last rendered element to fill it with its 
 * needed data
 * @param {object} tile - receiving the current tile data.
 * @param {number} index - receiving the index from renderPokemonTiles
 * @param {string} mode - string to decide if the file should be rendered in the tile or the card
 */
function renderPokemonTileType(tile, index, mode) {
    for (let j = 0; j < tile.types.length; j++) {
        const element = tile.types[j];
        if (mode === 'tile') {
            document.getElementById(`tile-info${index}`).innerHTML += templateType(element);
        } else if (mode === 'card') {

            document.getElementById(`card-type`).innerHTML += templateType(element);
        }
    }
}


/**
 * Renders the clicked card with all its informations.
 * @param {number} index - receiving the index
 */
function renderCard(index) {
    document.getElementById('card-container').innerHTML = templateCard(index + 1);
    document.getElementById('card-type').innerHTML = '';
    document.getElementById('sprite-card').src = pokemonData[index].sprite;
    document.getElementById('card-display').style.background = `var(--${pokemonData[index].types[0]})`;
    document.getElementById('pokemon-name-card').innerHTML = firstLetterToCapital(pokemonData[index].name);
    document.getElementById(`pokemon-id-card`).innerHTML = `#${pokemonData[index].id}`;
    renderPokemonTileType(pokemonData[index], '', 'card')
    document.getElementById('card-content').innerHTML = templateInfo(pokemonDataCard[0]);
}


/**
 * Renders the info section fo the card
 */
function renderInfo() {
    document.getElementById('card-content').innerHTML = templateInfo(pokemonDataCard[0]);
}


/**
 * Renders the stats of the pokemon.
 * @param {number} index - gets the current index of shown Pokemon
 */
function renderStats(index) {
    document.getElementById('card-content').innerHTML = '';
    document.getElementById('card-content').innerHTML = templateStats(pokemonDataCard[0],index-1);
}


/**
 * Renders the moves of the current Pokemon.
 * If there are less than 15 moves it just renders the amount of moves it has.
 */
function renderMoves() {
    let content = document.getElementById('card-content');
    content.innerHTML = '';
    content.innerHTML = `<div id="moves-container"></div>`

    if(pokemonDataCard[0]['moves'].length < 15){
        for (let i = 0; i < pokemonDataCard[0]['moves'].length; i++) {
            const move = pokemonDataCard[0]['moves'][i];
    
            document.getElementById('moves-container').innerHTML += templateMoves(move);
        }
    }else{
        for (let i = 0; i < 15; i++) {
            const move = pokemonDataCard[0]['moves'][i];
    
            document.getElementById('moves-container').innerHTML += templateMoves(move);
        }
    }
}


/**
 * Renders the evolution stages of chosen Pokemon
 * @param {number} index - gets the index of the current Pokemon
 */
function renderEvo(index) {
    document.getElementById('card-content').innerHTML ='';
    document.getElementById('card-content').innerHTML ='<div id="evocontent"></div>'; 
    document.getElementById('evocontent').innerHTML =templateEvo(index-1);
}