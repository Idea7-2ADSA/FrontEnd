let ultimoAlerta = []
function kpi1() {
    let repeticao = 0
    let totem = sessionStorage.IDTOTEM
    fetch("/totem/buscarAlerta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totemServer: totem
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    let tipoAlertaImg
                    for (i = 0; i < json.length; i++) {
                        for (let j = 0; j < ultimoAlerta.length; j++) {
                            if (ultimoAlerta[j].idTotem == json[i].fkTotem) {
                                if (ultimoAlerta[j].idUltimoAlerta == json[i].idAlerta) {
                                    repeticao = ultimoAlerta[j].repeticaoAlerta + 1
                                } else {
                                    repeticao = 0
                                }
                                ultimoAlerta.splice(j, 1)
                            }
                        }
                        if (json[i].tipoAlerta == "VERDE" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/verde.png" width="45px">'
                        } else if (json[i].tipoAlerta == "AMARELO" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/cuidado.png" width="45px">'
                        } else if (json[i].tipoAlerta == "VERMELHO" && repeticao < 2) {
                            tipoAlertaImg = '<img src="./img/laranja.png" width="45px">'
                        } else {
                            tipoAlertaImg = '<img src="./img/vermelho.png" width="45px">'
                        }
                        ultimoAlerta.push({
                            idUltimoAlerta: json[i].idAlerta,
                            idTotem: json[i].fkTotem,
                            repeticaoAlerta: repeticao
                        })
                    }
                    kpi_img.innerHTML = `
                        ${tipoAlertaImg}
                        Totem ${totem}
                    `
                })
            } else {
                throw "Houve um erro ao tentar buscar o ultimo alerta!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

let ultimosAlertas = []
function kpi2() {
    let totensSessionStorage = sessionStorage.TOTENS
    let totensFranquia = totensSessionStorage.split(",")
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
                    kpi_2.innerHTML = `<p>Totens em Alerta</p>`
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
                        if (json[i][0].tipoAlerta == "AMARELO" || json[i][0].tipoAlerta == "VERMELHO" || json[i][0].tipoAlerta == null || repeticao > 2) {
                            kpi_2.innerHTML += `<a href="">Totem ${json[i][0].fkTotem}</a>`
                        } 
                        ultimosAlertas.push({
                            idUltimoAlerta: json[i][0].idAlerta,
                            idTotem: json[i][0].fkTotem,
                            repeticaoAlerta: repeticao
                        })
                    }
                })
            } else {
                throw "Houve um erro ao tentar buscar os totens em alerta!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}

function kpi3() {
    let totem = sessionStorage.IDTOTEM
    fetch("/totem/buscarDadoComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totemServer: totem,
            componenteServer: 'PROCESSADOR'
        }),
    }).then((resposta)=> {
        console.log("resposta: ", resposta);
        if(resposta.ok) {
            resposta.json().then((json) => {
                if (json[0].MaxUsoCPU != null) {
                    usoCPU.innerHTML = `${json[0].MaxUsoCPU}%`
                } else {
                    usoCPU.innerHTML = `nenhum dado coletado hoje!`
                }
                atualizarKpis()
            })
        }else {
            throw "Houve um erro ao tentar buscar o componente do totem!";
        }

    }).catch((erro)=> {
        console.log(`#ERRO: ${resposta}`);
    })
    return false
}

function atualizarKpis() {
    setTimeout(() => {
        kpi1()
        kpi2()
        kpi3()
    }, 15000);
}