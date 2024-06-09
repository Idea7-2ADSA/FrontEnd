let ultimosAlertas = []
function buscarAlertas() {
    let totensSessionStorage = sessionStorage.TOTENSFRANQUIA
    let totensFranquia = totensSessionStorage.split(",")
    let diaReinicializacao = sessionStorage.DIAREINICIALIZACAO
    let horarioReinicializacao = sessionStorage.HORAREINICIALIZACAO
    let repeticao = 0
    fetch("/totem/buscarAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totensServer: totensFranquia
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json)
                    let tipoAlertaImg
                    kpis.innerHTML = ""
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
                        if (json[i][0].tipoAlerta == "VERDE" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/verde.png" width="45px">'
                        } else if (json[i][0].tipoAlerta == "AMARELO" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/cuidado.png" width="45px">'
                        } else if (json[i][0].tipoAlerta == "VERMELHO" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/laranja.png" width="45px">'
                        } else {
                            tipoAlertaImg = '<img src="./img/vermelho.png" width="45px">'
                        }
                        ultimosAlertas.push({
                            idUltimoAlerta: json[i][0].idAlerta,
                            idTotem: json[i][0].fkTotem,
                            repeticaoAlerta: repeticao
                        })
                        kpis.innerHTML += `
                            <div class="box-toten">
                                <p>Toten ${json[i][0].fkTotem}</p>
                                ${tipoAlertaImg}
                                <span>Próxima reinicialização: ${diaReinicializacao}, ${horarioReinicializacao}h</span>
                            </div>`;
                    }
                    atualizarTotens()
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

function atualizarTotens() {
    setTimeout(() => {
        buscarAlertas()
    }, 15000);
}