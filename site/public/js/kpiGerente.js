let totalTotensComAlerta
let totensSessionStorage = sessionStorage.TOTENSFRANQUIA
let totensFranquia = totensSessionStorage.split(",")
function buscarDadosKpi1() {
    totalTotensComAlerta = 0
    fetch("/kpi/buscarDados", {
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
                    for(let i = 0; i < json.length; i++) {
                        for(let j = 0; j < json[i].length; j++) {
                            if (json[i][j].qtdAlerta > 0) {
                                totalTotensComAlerta += 1
                            }
                        }
                    }
                    numeroAlertas.innerHTML = `${totalTotensComAlerta} Totens`
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

function buscarDadosKpi2() {
    let fkFranquia = sessionStorage.IDFRANQUIA
    fetch("/kpi/buscarAjustes", {
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
                    let diasReinicializacao = json[0].diaReinicializacao
                    let listaDiasReinicializacao
                    if(diasReinicializacao.length > 1) {
                        listaDiasReinicializacao = diasReinicializacao.split(',')
                    }else {
                        listaDiasReinicializacao = [diasReinicializacao]
                    } 
                    let proximoDia;
                    let diaEncontrado = false
                    for (let data = new Date().getDay(); data <= 6; data++) {
                        if (data == 6) {
                            data = -1
                            proximoDia = 0
                        } else {
                            proximoDia = data + 1
                        }
                        for (let i = 0; i < listaDiasReinicializacao.length; i++) {
                            if (listaDiasReinicializacao[i] == proximoDia) {
                                let diaDaSemana
                                if (listaDiasReinicializacao[i] == 0) {
                                    diaDaSemana = 'Domingo'
                                } else if (listaDiasReinicializacao[i] == 1) {
                                    diaDaSemana = 'Segunda-Feira'
                                } else if (listaDiasReinicializacao[i] == 2) {
                                    diaDaSemana = 'Terça-Feira'
                                } else if (listaDiasReinicializacao[i] == 3) {
                                    diaDaSemana = 'Quarta-Feira'
                                } else if (listaDiasReinicializacao[i] == 4) {
                                    diaDaSemana = 'Quinta-Feira'
                                } else if (listaDiasReinicializacao[i] == 5) {
                                    diaDaSemana = 'Sexta-Feira'
                                } else if (listaDiasReinicializacao[i] == 6) {
                                    diaDaSemana = 'Sábado'
                                }
                                diaReinicializacao.innerHTML = diaDaSemana
                                sessionStorage.DIAREINICIALIZACAO = diaDaSemana
                                diaEncontrado = true
                            }
                        }
                        if (diaEncontrado) {
                            break
                        } 
                    }
                    horario = json[0].horaReinicializacao
                    listaSplitHorario = horario.split(":")
                    horarioReinicializacao.innerHTML = `${listaSplitHorario[0]}:${listaSplitHorario[1]}`
                    sessionStorage.HORAREINICIALIZACAO = listaSplitHorario[0]
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

function buscarDadosKpi3() {
    fetch("/kpi/buscarDataHora", {
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
                    let totensInativos = []
                    for(let i = 0; i < json.length; i++) {
                        let minutoAgora = Number(new Date().getMinutes())
                        let horaAgora = Number(new Date().getHours())
                        let ultimoMinuto = Number(json[i].minutos)
                        let ultimaHora = Number(json[i].horas)
                        let minutosDiferenca = 0
                        if(ultimaHora == horaAgora) {
                            while(ultimoMinuto != minutoAgora) {
                                if(ultimoMinuto == 59) {
                                    ultimoMinuto = 0
                                }else {
                                    ultimoMinuto++    
                                }
                                minutosDiferenca++
                            }
                        }else {
                            minutosDiferenca = 60
                        }
                        if(minutosDiferenca > 20) {
                            for(let j = 0; j <= totensInativos.length; j++) {
                                if(!totensInativos.includes(json[i].fkTotem)) {
                                    totensInativos.push(json[i].fkTotem)
                                }    
                            }
                        }else {
                            for (let j = 0; j <= totensInativos.length; j++) {
                                if (totensInativos[j] == json[i].fkTotem) {
                                    totensInativos.splice(j,1)
                                    break;
                                }
                            }
                        }
                    }
                    console.log(totensInativos)
                    let mes = new Date().getMonth()
                    let dia = new Date().getDate()
                    let hora = new Date().getHours()
                    let minuto = new Date().getMinutes()
                    let valorEmReal = (totensInativos.length * 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                    valorPerda.innerHTML = `R$ ${valorEmReal}`
                    data_horario_calculo.innerHTML = `Cálculo feito em  ${mes + 1}/${dia} às ${hora}:${minuto}` 
                    atualizarKpis()
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

function atualizarKpis() {
    setTimeout(() => {
        // buscarDadosKpi1()
        // buscarDadosKpi2()
        buscarDadosKpi3()
    }, 15000);
}