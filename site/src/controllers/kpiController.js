var dashboardModel = require("../models/dashboardModel")
var kpiModel = require("../models/kpiModel")

function buscarDados(req, res) {
    var totens = req.body.totensServer
    var listaDados = []

    if (totens == null) {
        res.status(400).send("A lista de totens está nula")
    } else {
        for (let i = 0; i < totens.length; i++) {
            kpiModel.buscaDados(Number(totens[i]))
                .then((resBuscaDados) => {
                    listaDados.push(resBuscaDados)
                    if (listaDados.length >= totens.length) {
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

function buscarAjustes(req, res) {
    var fkFranquia = req.body.fkFranquiaServer

    if (fkFranquia == null) {
        res.status(400).send("A fk da franquia está nula")
    } else {
        kpiModel.buscarAjustes(fkFranquia)
            .then((resAjustes) => {
                if (resAjustes.length > 0) {
                    res.json(resAjustes)
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

function buscarDataHoraTotem(req, res) {
    var totens = req.body.totensServer
    var listaDados = []
    if (totens == null) {
        res.status(400).send("A fk da franquia está nula")
    } else {
        for (let i = 0; i < totens.length; i++) {
            kpiModel.buscarDataHora(Number(totens[i]))
                .then((resBuscaDados) => {
                    if(resBuscaDados.length > 0) {
                        let data_Hora = resBuscaDados[0].dataHora
                        let lDataHora =data_Hora.split(" ")
                        let lHorario = lDataHora[1].split(":")
                        listaDados.push({horas: lHorario[0], minutos: lHorario[1], fkTotem: resBuscaDados[0].fkTotem})
                        if (listaDados.length >= totens.length) {
                            res.json(listaDados)
                        }
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
    buscarDados,
    buscarAjustes,
    buscarDataHoraTotem
}