let segunda, terca, quarta, quinta, sexta, sabado, domingo;
let fkFranquia = sessionStorage.IDFRANQUIA;
let totalAlertasAtual = 0;
let alertasPorTotem = {};

function buscarTotens() {
    let listaTotens = [];
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
                    listaTotens.push(json[i].codigoTotem);
                }
                sessionStorage.TOTENSFRANQUIA = listaTotens;
            });
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}

function buscarDados() {
    segunda = 0, terca = 0, quarta = 0, quinta = 0, sexta = 0, sabado = 0, domingo = 0;
    let totensSessionStorage = sessionStorage.TOTENSFRANQUIA;
    let totensFranquia = totensSessionStorage.split(",");
    alertasPorTotem = {};
    let novosAlertasPorTotem = [];

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
                let totalAlertasNovo = 0;
                for (let i = 0; i < json.length; i++) {
                    let totemCodigo = totensFranquia[i];
                    let indice = i % 7;
                    if (!alertasPorTotem[totemCodigo]) {
                        alertasPorTotem[totemCodigo] = {};
                        alertasPorTotem[totemCodigo].indices = [0, 1, 2, 3, 4, 5, 6];
                        alertasPorTotem[totemCodigo].alertas = [0, 0, 0, 0, 0, 0, 0];
                    }
                    for (let j = 0; j < json[i].length; j++) {
                        if (json[i][j].diaDaSemana == "Monday") {
                            segunda += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Tuesday") {
                            terca += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Wednesday") {
                            quarta += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Thursday") {
                            quinta += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Friday") {
                            sexta += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Saturday") {
                            sabado += json[i][j].qtdAlerta
                        } else if (json[i][j].diaDaSemana == "Sunday") {
                            domingo += json[i][j].qtdAlerta
                        }
                        alertasPorTotem[totemCodigo].alertas[indice] += json[i][j].qtdAlerta;
                        totalAlertasNovo += json[i][j].qtdAlerta;

                        let alertasAntes = alertasPorTotem[totemCodigo].alertas[indice];
                        if (alertasPorTotem[totemCodigo].alertas[indice] > alertasAntes) {
                            novosAlertasPorTotem.push(totemCodigo);
                        }
                    }
                }
                let totalAlertasAnterior = sessionStorage.getItem('TOTAL_ALERTAS_ANTERIOR') || 0;
                if (totalAlertasNovo > totalAlertasAnterior) {
                    integracaoComTelegram(totalAlertasNovo, alertasPorTotem, novosAlertasPorTotem);
                    sessionStorage.setItem('TOTAL_ALERTAS_ANTERIOR', totalAlertasNovo);
                    totalAlertasAtual = totalAlertasNovo;
                }
            });
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
    atualizarGrafico(myChart);
}

function atualizarGrafico(myChart) {
    buscarDados();
    setTimeout(() => {
        myChart.data.datasets[0].data = [segunda, terca, quarta, quinta, sexta, sabado, domingo];
        myChart.update();
        setTimeout(() => {
            atualizarGrafico(myChart);
        }, 15000);
    }, 500);
}
