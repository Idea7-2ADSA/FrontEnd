var ajusteModel = require("../models/ajusteModel")

console.log("em ajusteController.js")
function ajustarParametros(req, res) {
    var diaReinicializacao = req.body.diaReinicializacaoServer
    var horaReinicializacao = req.body.horaReinicializacaoServer
    var fkGerente = req.body.fkGerenteServer
    var fkFranquia = req.body.fkFranquiaServer
    

    if(fkGerente == undefined) {
        res.status(400).send("A fk do gerente está undefined!")
    }else if(fkFranquia == undefined) {
        res.status(400).send("A fk da franquia está undefined!")
    }else if(diaReinicializacao == undefined) {
        res.status(400).send("Os dias de reinicialização está undefined!")
    }else if(horaReinicializacao == undefined) {
        res.status(400).send("A hora da reinicilização está undefined!")
    }else{
        ajusteModel.ajustarParametros(diaReinicializacao, horaReinicializacao, fkGerente, fkFranquia)
        .then((resultado) => {
            res.status(201).json(resultado);
        }   
        )
        .catch(
            function(erro){
                console.log(erro)
                console.log("/n Houve erro ao efetuar o ajuste", erro.sqlMessage);
            }
        );
    }
}
module.exports = {
    ajustarParametros
}