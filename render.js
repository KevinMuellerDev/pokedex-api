/*  @data: receiving the pokemonData JSON.
    @dataOffs: receiving the Offset to render the template from the last added tile.
    This function gets the ids of the rendered elements to fill them with their 
    needed data and increments the offset at the end.   */
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


/*  @tile: receiving the current tile id.
    @index: receiving the index from renderPokemonTiles.
    @mode: boolean to decide if the type should be rendered in the tile or the card
    This function gets the id of the last rendered element to fill it with its 
    needed data. */
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


/*  @index: gets the index of the clicked tile.
    renders the clicked card with all its informations.
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

/* renders the info section of the card */
function renderInfo() {
    document.getElementById('card-content').innerHTML = templateInfo(pokemonDataCard[0]);
}


/*  @index: gets the current index of shown pokemon
    Renders the stats of the pokemon.
*/
function renderStats(index) {
    document.getElementById('card-content').innerHTML = '';
    document.getElementById('card-content').innerHTML = templateStats(pokemonDataCard[0],index-1);
}

/*  this function renders the moves of the current pokemon.
    If there are less than 15 moves it just renders the amount of moves it has.
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


/*  @index: gets the current index of pokemon.
    renders the evolution stages of the chosen pokemon.
*/
function renderEvo(index) {
    document.getElementById('card-content').innerHTML ='';
    document.getElementById('card-content').innerHTML ='<div id="evocontent"></div>'; 
    document.getElementById('evocontent').innerHTML =templateEvo(index-1);
}