let totem = sessionStorage.IDTOTEM
let labels1 = []
let data1 = []
let labels2 = []
let data2 = []
function buscarDadosDash1() {
    labels1 = []
    data1 = []
    fetch("/totem/buscarDadosComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totemServer: totem,
            componenteServer: 'PROCESSADOR'
        }),
    }).then((resposta) => {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            resposta.json().then((json) => {
                for(let i = 0; i < json.length; i++) {
                    labels1.push(json[i].horario)
                    data1.push(json[i].porcentagemUso)
                }
            })
        } else {
            throw "Houve um erro ao tentar buscar o componente do totem!";
        }

    }).catch((erro) => {
        console.log(`#ERRO: ${resposta}`);
    })
    return false
}

function buscarDadosDash2() {
    labels2 = []
    data2 = []
    fetch("/totem/buscarDadosComponente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            totemServer: totem,
            componenteServer: 'MEMORIA'
        }),
    }).then((resposta) => {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            resposta.json().then((json) => {
                for (let i = 0; i < json.length; i++) {
                    labels2.push(json[i].horario)
                    data2.push(json[i].porcentagemUso)
                }
            })
        } else {
            throw "Houve um erro ao tentar buscar o componente do totem!";
        }

    }).catch((erro) => {
        console.log(`#ERRO: ${resposta}`);
    })
    return false
}

function plotarGrafico1() {
    const data = {
        labels: labels1,
        datasets: [
            {
                label: "Consumo da CPU",
                borderColor: "rgb(0,0,0)",
                backgroundColor: "rgb(255,209,99)",
                data: data1,
                borderWidth: 1,
            },
        ],
    }
    const config1 = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    }
    const myChart1 = new Chart(
        document.getElementById("myChart").getContext('2d'),
        config1
    );
    atualizarGrafico1(myChart1)
}

function plotarGrafico2() {
    const data = {
        labels: labels2,
        datasets: [
            {
                label: "Consumo de RAM",
                borderColor: "rgb(0,0,0)",
                backgroundColor: "rgb(255,209,99)",
                data: data2,
                borderWidth: 1,
            },
        ],
    }
    const config2 = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
                },
            },
        },
    }
    const myChart2 = new Chart(
        document.getElementById("myChart2").getContext('2d'),
        config2
    );
    atualizarGrafico2(myChart2)
}

function atualizarGrafico1(myChart1) {
    buscarDadosDash1();
    setTimeout(() => {
        myChart1.data.labels = labels1
        myChart1.data.datasets[0].data = data1
        myChart1.update();
        setTimeout(() => {
            atualizarGrafico1(myChart1)
        }, 15000)
    }, 500);
}

function atualizarGrafico2(myChart2) {
    buscarDadosDash2();
    setTimeout(() => {
        myChart2.data.labels = labels2
        myChart2.data.datasets[0].data = data2
        myChart2.update();
        setTimeout(() => {
            atualizarGrafico2(myChart2)
        }, 15000)
    }, 500);
}