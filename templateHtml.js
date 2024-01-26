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
                    <a onclick="renderStats(${index})">Stats</a>
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

function templateStats(data, index) {
    return `
        <table>
            <tbody>
                <tr>
                    ${templateStatbar(data, 0, index)}
                </tr>
                <tr>
                    ${templateStatbar(data, 1, index)}
                </tr>
                <tr>
                    ${templateStatbar(data, 2, index)}
                </tr>
                <tr>
                    ${templateStatbar(data, 3, index)}
                </tr>
                <tr>
                    ${templateStatbar(data, 4, index)}
                </tr>
                <tr>
                    ${templateStatbar(data, 5, index)}
                </tr>
                <tr>
                    ${templateTotalStats(index)}
                </tr>
            </tbody>
        </table>
    `
}

function templateStatbar(data,index,barColor) {
    return `
        <td>${data['stats'][index]['basestat']}:</td>
        <td>${data['stats'][index]['value']}</td>
        <td class="stat-width"> 
            <div id="myProgress">
                <div id="myBar" style="width:${getStatbarWidth(data['stats'][index]['value'])}%; background: var(--${pokemonData[barColor].types[0]})"></div>
            </div>
        </td>
    `
}

function templateTotalStats(barColor) {
    return `
    <td><b>Total:</b></td>
    <td><b>${totalStats()}</b></td>
    <td class="stat-width"> 
        <div id="myProgress">
            <div id="myBar" style="width:${getStatbarWidth(totalStats(), true)}%; background: var(--${pokemonData[barColor].types[0]})"></div>
        </div>
    </td>
`
}

function templateMoves(data) {
    return `
        <div class="move-div">${firstLetterToCapital(data)}</div>
    `
}

function templateEvo(index) {
    let textHtml = '';
    for (let i = 0; i < evoData.length; i++) {
        const evolution = evoData[i];
        textHtml += `
            <div style="background: var(--${pokemonData[index].types[0]})">
                <img src="${evolution.sprite}" alt="">
                <h4>${firstLetterToCapital(evolution.name)}</h4>
                <h3>#${evolution.id}</h3>
            </div>
         `
    }
    return textHtml
}

// 