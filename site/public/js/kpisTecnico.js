function buscarFranquias() {
    fetch("/franquia/buscarFranquias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    for(let i = 0; i < json.length; i ++) {
                        kpis.innerHTML += `
                        <div class="kpi">
                            <p>${json[i].logradouro} - ${json[i].numero}</p>
                            <button class="botao-dialogo" data-target="${i + 1}" fkfranquia ="${json[i].idFranquia}">Mais Informações</button>
                        </div>
                        `
                        espacomodal.innerHTML += `
                            <dialog id="${i + 1}">
                                <div class="elementos" data-target="${i + 1}"></div>
                                <div class="espaco-btn">
                                    <button>Fechar</button>
                                </div>
                            </dialog>
                        `
                    }
                })
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

function buscarTotens(fkFranquia, idDialogo) {
    listaTotens = []
    fetch("/dashboard/buscarTotens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkFranquiaServer: fkFranquia
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    for (let i = 0; i < json.length; i++) {
                        listaTotens.push(json[i].codigoTotem)
                    }
                    sessionStorage.TOTENS = listaTotens
                    buscarAlertas(listaTotens, idDialogo)
                })
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

let ultimosAlertas = []
function buscarAlertas(listaTotens, idDialogo) {
    const elementosDialogo = document.querySelectorAll(".elementos");
    elementosDialogo.forEach(function (elemento) {
        elemento.innerHTML = ""
    })
    let repeticao = 0
    fetch("/totem/buscarAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totensServer: listaTotens
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json)
                    let tipoAlertaImg
                    for (i = 0; i < json.length; i++) {
                        for (let j = 0; j < ultimosAlertas.length; j++) {
                            if (ultimosAlertas[j].idTotem == json[i][0].fkTotem) {
                                if (ultimosAlertas[j].idUltimoAlerta == json[i][0].idAlerta) {
                                    repeticao = ultimosAlertas[j].repeticaoAlerta + 1
                                } else {
                                    repeticao = 0
                                }
                                ultimosAlertas.splice(j, 1)
                            }
                        }
                        if (json[i][0].tipoAlerta == "VERDE" && repeticao < 1) {
                            tipoAlertaImg = '<img src="./img/verde.png" width="45px">'
                        } else if (json[i][0].tipoAlerta == "AMARELO" && repeticao < 1) {
                            tipoAlertaImg = '<img src="./img/cuidado.png" width="45px">'
                        } else if (json[i][0].tipoAlerta == "VERMELHO" && repeticao < 1) {
                            tipoAlertaImg = '<img src="./img/laranja.png" width="45px">'
                        } else {
                            tipoAlertaImg = '<img src="./img/vermelho.png" width="45px">'
                        }
                        ultimosAlertas.push({
                            idUltimoAlerta: json[i][0].idAlerta,
                            idTotem: json[i][0].fkTotem,
                            repeticaoAlerta: repeticao
                        })
                        elementosDialogo.forEach(function (elemento) {
                            if (elemento.getAttribute("data-target") == idDialogo) {
                                elemento.innerHTML += `
                                <div class="box-toten" idTotem ="${json[i][0].fkTotem}">
                                    <p>Totem ${json[i][0].fkTotem}</p>
                                    ${tipoAlertaImg}
                                </div>
                                `
                            }
                        })
                    }
                    const boxTotens = document.querySelectorAll(".box-toten");
                    boxTotens.forEach(function(boxToten) {
                        boxToten.addEventListener('click', function(event) {
                            idTotem = event.target.getAttribute("idTotem")
                            sessionStorage.IDTOTEM = idTotem
                            window.location = "informacaoTotem.html"
                        })
                    })
                    const dialogo = document.getElementById(idDialogo);
                    dialogo.showModal();
                })
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}