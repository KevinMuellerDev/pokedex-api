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
        renderPokemonTileType(tile, i);
        document.getElementById(`sprite${i}`).src = tile.sprite
        document.getElementById(`sprite${i}`).alt = tile.name
    }
    dataOffset += 25;
}

function renderPokemonTileType(tile, index) {
    for (let j = 0; j < tile.types.length; j++) {
        const element = tile.types[j];
        document.getElementById(`tile-info${index}`).innerHTML += templateType(element);
    }
}


function renderCard(data){
    // implement render and data logic
}
