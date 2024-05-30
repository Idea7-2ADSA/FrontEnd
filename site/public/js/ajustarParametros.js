function ajustarParametros() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var valoresSelecionados = [];
    var diasSemana = [];
    var dia;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            valoresSelecionados.push(checkbox.value);
            if(checkbox.value == 1){
                dia = 'Segunda-Feira'
            }

            else if(checkbox.value == 2){
                dia =  'Terça-Feira'
            }

            else if(checkbox.value == 3){
                dia = 'Quarta-Feira'
            }

            else if(checkbox.value == 4){
                dia = 'Quinta-Feira'
            }

            else if(checkbox.value == 5){
                dia = 'Sexta-Feira'
            }

            else if(checkbox.value == 6){
                dia = 'Sábado'
            }

            else{
                dia = 'Domingo'
            }
            diasSemana.push(dia)
        }
    });
    var horaReinicializacao = horario.value;

    var confirmado = confirm(`Confirma o ajuste dos parâmetros de reinicialização?

        Dias que os totens serão reinicilizados: 
        ${diasSemana}

        Horário que os totens serão reinicializados: ${horaReinicializacao}`);
    if (confirmado) {

        var fkFranquia = sessionStorage.IDFRANQUIA;
        var fkGerente = sessionStorage.ID;
        var diaReinicializacao = valoresSelecionados;
        
        fetch("/ajuste/ajustarParametros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                diaReinicializacaoServer: diaReinicializacao,
                horaReinicializacaoServer: horaReinicializacao,
                fkFranquiaServer: fkFranquia,
                fkGerenteServer: fkGerente
            }),
        }).then(function(resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                console.log(resposta.status)
                console.log("Parametros sendo ajustado!")
                window.location = "../dashboard/ajustes.html"
            } else if (resposta.status == 404) {
                throw "Erro ao efetuar o ajuste!";
            } else {
                throw "Erro ao tentar fazer um ajuste"
            }
        }).catch(function(resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    } else {
        return false; 
    }
}
