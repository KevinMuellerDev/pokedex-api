function templateTile(index) {
    return `<div id="tile${index}" class="poke-tile" style ="" onclick="showCard(${index})">
                <div id="tile-info${index}" class="poke-info">
                    <h4 id="pokemon-name${index}"></h4>
                    <p id="pokemon-id${index}"></p>
                </div>
                <img class="poke-sprite" id="sprite${index}" src="" alt="">
                <img class="tile-pokeball" src="./img/pokeball-fade.png" alt="">
            </div>`
}

function templateType(type) {
    return `<div class="tile-type">${firstLetterToCapital(type)}</div>`
}

