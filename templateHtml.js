function templateTile(index, id) {
    return `<div id="tile${index}" class="poke-tile" style ="" onclick="showCard(${id})">
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
            ${templateCardDisplay()}
            <img id="sprite-card" class="card-sprite" src="" alt="">
            <div class="card-bottom">
                ${templateCardNav(index)}
                <div id="card-content"></div>
                <div class="show-nav">
                    ${templateCardShowNav(index)}
                </div>
            </div>
        </div>
        `
}

function templateCardDisplay(){
    return `
        <div id="card-display" class="card-top" style="">
            <div id="poke-card-info" class="card-info">
                <h2 id="pokemon-name-card"></h2>
                <p id="pokemon-id-card"></p>
                <div id="card-type"></div>
            </div>
            <img class="card-pokeball" src="./img/pokeball-fade.png" alt="">
        </div>
    `
}

function templateCardNav(index){
    return `
        <div class="nav-card">
            <a id="nav1" class="nav-active" onclick="renderInfo();activateNav(1);">Info</a>
            <a id="nav2" onclick="renderStats(${index});activateNav(2);">Stats</a>
            <a id="nav3" onclick="renderMoves();activateNav(3);">Moves</a>
            <a id="nav4" onclick="renderEvo(${index});activateNav(4);">Evolution</a>
        </div>
    `
}

function templateCardShowNav(index){
    return `
        <div>
            <img src="./img/arrowleft.png" alt="" onclick="previousPokemon(${index})">
        </div>
        <div>
            <img src="./img/x.png" alt="" onclick="closeCard()">
        </div>
        <div>
            <img src="./img/arrowright.png" alt="" onclick="nextPokemon(${index})">
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

function templateStatbar(data, index, barColor) {
    let baseStats = data['stats'][index]['basestat'];
    let statValues = data['stats'][index]['value'];
    let bar = pokemonData[barColor].types[0];

    setTimeout(() => {
        document.getElementById(`myBar-${index}`).style.width = `${getStatbarWidth(statValues, baseStats)}%`;
    }, 100);

    return `
        <td>${baseStats}:</td>
        <td>${statValues}</td>
        <td class="stat-width"> 
            <div id="myProgress-${index}" class="myprogress">
                <div id="myBar-${index}" class="mybar" style="width: 0%; background: var(--${bar})"></div>
            </div>
        </td>
    `;
}


function templateTotalStats(barColor) {
    let bar =pokemonData[barColor].types[0];

    setTimeout(() => {
        document.getElementById('myBar').style.width = `${getStatbarWidth(totalStats(),null,true)}%`;
    }, 100);

    return `
    <td><b>Total:</b></td>
    <td><b>${totalStats()}</b></td>
    <td class="stat-width"> 
        <div id="myProgress" class="myprogress">
            <div id="myBar" class="mybar" style="width:0%; background: var(--${bar})"></div>
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
            <div style="background: var(--${evolution.type})">
                <img src="${evolution.sprite}" alt="">
                <h4>${firstLetterToCapital(evolution.name)}</h4>
                <h3>#${evolution.id}</h3>
            </div>
         `
    }
    return textHtml
}

// 