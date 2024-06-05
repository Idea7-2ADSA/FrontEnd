let segunda, terca, quarta, quinta, sexta, sabado, domingo
let fkFranquia = sessionStorage.IDFRANQUIA
function buscarTotens() {
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
                    for(let i = 0; i < json.length; i++) {
                        listaTotens.push(json[i].codigoTotem)
                    }
                    sessionStorage.TOTENSFRANQUIA = listaTotens;
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
buscarTotens()

function buscarDados() {
    segunda = 0, terca = 0, quarta = 0, quinta = 0, sexta = 0, sabado = 0, domingo = 0
    let totensFranquia = sessionStorage.TOTENSFRANQUIA.split(",")
    fetch("/dashboard/buscarDados", {
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
                    for(let i = 0; i < json.length; i ++) {
                        for(let j = 0; j < json[i].length; j++){
                            if(json[i][j].diaDaSemana == 0) {
                                domingo += json[i][j].qtdAlerta
                            } else if (json[i][j].diaDaSemana == 1) {
                                segunda += json[i][j].qtdAlerta
                            } else if (json[i][j].diaDaSemana == 2) {
                                terca += json[i][j].qtdAlerta
                            }else if(json[i][j].diaDaSemana == 3) {
                                quarta += json[i][j].qtdAlerta
                            } else if (json[i][j].diaDaSemana == 4) {
                                quinta += json[i][j].qtdAlerta
                            } else if (json[i][j].diaDaSemana == 5) {
                                sexta += json[i][j].qtdAlerta
                            } else if (json[i][j].diaDaSemana == 6) {
                                sabado += json[i][j].qtdAlerta
                            }
                        }
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

function plotarGrafico() {
    const data = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
        datasets: [
            {
                label: "Número de Ocorrências",
                borderColor: "rgb(0,0,0)",
                backgroundColor: "rgb(255,209,99)",
                data: [segunda, terca, quarta, quinta, sexta, sabado, domingo],
                borderWidth: 1,
            },
        ],
    }
    const config = {
        type: "bar",
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    }
    const myChart = new Chart(
        document.getElementById("myChart").getContext('2d'),
        config
    );
    atualizarGrafico(myChart)
}
function atualizarGrafico(myChart) {
    buscarDados();
    setTimeout(() => {
        myChart.data.datasets[0].data = [segunda, terca, quarta, quinta, sexta, sabado, domingo]
        myChart.update();
        setTimeout(() => {
            atualizarGrafico(myChart)
        }, 15000)
    }, 500);
}