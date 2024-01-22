function renderPokemonInfo(name, picture) {
    document.getElementById('pokemon-name').innerHTML = firstLetterToCapital(name);
    document.getElementById('sprite').src = picture
    document.getElementById('sprite').alt = name
}

function firstLetterToCapital(name) {
    let str = name;
    let modStr = str[0].toUpperCase() + str.slice(1);
    
    return modStr;
}