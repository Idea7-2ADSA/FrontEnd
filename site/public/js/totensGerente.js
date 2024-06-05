function buscarAlertas() {
    let totensSessionStorage = sessionStorage.TOTENSFRANQUIA
    let totensFranquia = totensSessionStorage.split(",")
    let diaReinicializacao = sessionStorage.DIAREINICIALIZACAO
    let horarioReinicializacao = sessionStorage.HORAREINICIALIZACAO
    fetch("/totem/buscarAlerta", {
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
                    let tipoAlertaImg
                    kpis.innerHTML = ""
                        for (i = 0; i < json.length; i++) {
                            if (json[i][0].tipoAlerta == "VERDE") {
                                tipoAlertaImg = '<img src="./img/verde.png" width="45px">'
                            } else if (json[i][0].tipoAlerta == "AMARELO") {
                                tipoAlertaImg = '<img src="./img/cuidado.png" width="45px">'
                            } else if (json[i][0].tipoAlerta == "VERMELHO") {
                                tipoAlertaImg = '<img src="./img/laranja.png" width="45px">'
                            }else {
                                tipoAlertaImg = '<img src="./img/vermelho.png" width="45px">'
                            }
                            kpis.innerHTML += `
                            <div class="box-toten">
                                <p>Toten ${json[i][0].fkTotem}</p>
                                ${tipoAlertaImg}
                                <span>Próxima reinicialização: ${diaReinicializacao}, ${horarioReinicializacao}h</span>
                            </div>`;
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

function atualizarTotens() {

}