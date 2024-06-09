var dashboardModel = require("../models/dashboardModel")
var totemModel = require("../models/totemModel")
function buscarTotens(req, res) {
    var fkFranquia = req.body.fkFranquiaServer
    if (fkFranquia == null) {
        res.status(400).send("A fk da franquia está nula")
    } else {
        dashboardModel.buscarTotens(fkFranquia)
            .then((resTotens) => {
                res.json(resTotens)
            }).catch((erro) => {
                console.log(erro)
                console.log(
                    "\nHouve um erro ao buscar os dados! Erro:",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            })
    }
}


function buscarDados(req, res) {
    var totens = req.body.totensServer
    var listaDados = []

    if(totens == null) {
        res.status(400).send("A lista de totens está nula")
    }else {
        for(let i = 0; i < totens.length; i++ ) {
            dashboardModel.buscaDados(Number(totens[i]))
            .then((resBuscaDados)=> {
                listaDados.push(resBuscaDados)
                if(listaDados.length >= totens.length) {
                    res.json(listaDados)
                }
            }).catch((erro) => {
                console.log(erro)
                console.log(
                    "\nHouve um erro ao buscar os dados! Erro:",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            })
        }
    }
}

module.exports = {
    buscarTotens,
    buscarDados
}