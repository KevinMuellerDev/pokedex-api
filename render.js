function renderPokemonInfo(name, picture) {
    document.getElementById('pokemon-name').innerHTML = name;
    document.getElementById('sprite').src = picture
    document.getElementById('sprite').alt = name
}