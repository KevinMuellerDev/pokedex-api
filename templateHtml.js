function templateTile(index) {
    return `<div id="tile${index}" class="poke-tile" style ="">
                <div id="tile-info${index}" class="poke-info">
                    <h3 id="pokemon-name${index}"></h3>
                </div>
                <img class="poke-sprite" id="sprite${index}" src="" alt="">
            </div>`
}

function templateType(type) {
    return `<div class="tile-type">${firstLetterToCapital(type)}</div>`
}