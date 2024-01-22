function renderPokemonTiles(data) {
for (let i = 0; i < data.length; i++) {
    const tile = data[i];
    console.log(tile);

    document.getElementById('tiles-container').innerHTML+=templateTile(i);
    document.getElementById(`tile${i}`).style.background = `var(--${tile.types[0]})`;
    document.getElementById(`pokemon-name${i}`).innerHTML = firstLetterToCapital(tile.name);
    for (let j = 0; j < tile.types.length; j++) {
        const element = tile.types[j];
        console.log(element)
        document.getElementById(`tile-info${i}`).innerHTML += templateType(element);
    }
    document.getElementById(`sprite${i}`).src = tile.sprite
    document.getElementById(`sprite${i}`).alt = tile.name
}


}

