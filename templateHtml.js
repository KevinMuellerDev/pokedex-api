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

function templateCard(index) {
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
                    <a onclick="renderInfo()">Info</a>
                    <a onclick="renderStats()">Stats</a>
                    <a onclick="renderMoves()">Moves</a>
                    <a onclick="renderEvo(${index})">Evolution</a>
                </div>
                <div id="card-content"></div>
            </div>
        </div>
        `
}

function templateInfo(data) {
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
                    <td>Abilities:</td>
                    <td>${data['abilities']}</td>
                </tr>
            </tbody>
        </table>
        <div class="card-flavortext">
            <span>${data['flavortext']}</span>
        </div>
    `
}

function templateStats(data) {
    return `
        <table>
            <tbody>
                <tr>
                    ${templateStatbar(data, 0)}
                </tr>
                <tr>
                    ${templateStatbar(data, 1)}
                </tr>
                <tr>
                    ${templateStatbar(data, 2)}
                </tr>
                <tr>
                    ${templateStatbar(data, 3)}
                </tr>
                <tr>
                    ${templateStatbar(data, 4)}
                </tr>
                <tr>
                    ${templateStatbar(data, 5)}
                </tr>
                <tr>
                    ${templateTotalStats()}
                </tr>
            </tbody>
        </table>
    `
}

function templateStatbar(data, index) {
    return `
        <td>${data['stats'][index]['basestat']}:</td>
        <td>${data['stats'][index]['value']}</td>
        <td class="stat-width"> 
            <div id="myProgress">
                <div id="myBar" style="width:${getStatbarWidth(data['stats'][index]['value'])}%"></div>
            </div>
        </td>
    `
}

function templateTotalStats() {
    return `
    <td><b>Total:</b></td>
    <td><b>${totalStats()}</b></td>
    <td class="stat-width"> 
        <div id="myProgress">
            <div id="myBar" style="width:${getStatbarWidth(totalStats(), true)}%"></div>
        </div>
    </td>
`
}

function templateMoves(data) {
    return `
        <div class="move-div">${firstLetterToCapital(data)}</div>
    `
}

function templateEvo() {
    let textHtml = '';
    for (let i = 0; i < evoData.length; i++) {
        const evolution = evoData[i];
        textHtml += `
            <div>
                <img src="${evolution.sprite}" alt=""style="height: 60px">
            </div>
         `
    }
    return textHtml
}