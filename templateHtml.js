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

function templateCard() {
    return `
        <div class="blur-bg" onclick="closeCard()"></div>
        <div id="card">
            <div id="card-display" class="card-top" style="">
                <div id="poke-card-info" class="card-info">
                    <h2 id="pokemon-name-card"></h2>
                    <p id="pokemon-id-card"></p>
                    <div id="card-type"></div>
                </div>
                <img class="card-pokeball" src="./img/pokeball-fade.png" alt="">
            </div>
            <img id="sprite-card" class="card-sprite" src="" alt="">
            <div class="card-bottom">
                <div class="nav-card">
                    <a href="#">Info</a>
                    <a href="#">Base Stats</a>
                    <a href="" onclick="">Moves</a>
                    <a href="#">Evolution</a>
                </div>
                <div id="card-content"></div>
            </div>
        </div>
        `
}

function templateStats(data) {
    return `
        <table>
            <tbody>
                <tr>
                    <td>Species:</td>
                    <td>${data['species']}</td>
                </tr>
                <tr>
                    <td>Height:</td>
                    <td>${data['height']}m</td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td>${data['weight']}kg</td>
                </tr>
                <tr>
                    <td>Abilities:</td>Ï
                    <td>${data['abilities']}</td>
                </tr>
            </tbody>
        </table>
        <div class="card-flavortext">
            <span>${data['flavortext']}</span>
        </div>
    `
}

function templateMoves(data){
    return html`
        <div class="move-div"></div>
    `
}