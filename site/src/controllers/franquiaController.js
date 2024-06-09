franquiaModel = require("../models/franquiaModel")
totemModel = require("../models/totemModel")
function buscarFranquias(req, res) {
    listaTotens = []
    listaAlertas = []
    totalTotens = 0;
    franquiaModel.buscarFranquias()
    .then((resFranquias) => {
        res.json(resFranquias)
    }).catch((erro) => {
        console.log(erro)
        console.log(
            "\nHouve um erro ao buscar os dados! Erro:",
            erro.sqlMessage
        )
        res.status(500).json(erro.sqlMessage)
    });
}

module.exports = {
    buscarFranquias
}