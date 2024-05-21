var totemModel = require("../models/totemModel")
var usuarioModel = require("../models/usuarioModel")
var franquiaModel = require("../models/franquiaModel")

function cadastrarTotem(req, res) {
    var codigoTotem = req.body.codigoServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var cep = req.body.cepServer

    if(codigoTotem == undefined) {
        res.status(400).send("O código do totem está undefined!")
    }else if(senha == undefined) {
        res.status(400).send("A senha está undefined!")
    }else if(email == undefined) {
        res.status(400).send("O email está undefined!")
    }else if(cep == undefined) {
        res.status(400).send("O cep está undefined!")
    }else{
        usuarioModel.autenticarTecnico(email, senha)
        .then((resultadoAutenticarTecnico) => {
            if(resultadoAutenticarTecnico.length > 0) {
                franquiaModel.consultarFranquia(cep)
                .then((respostaFranquia) => {
                    if(respostaFranquia.length > 0) {
                        totemModel.cadastrar(codigoTotem, respostaFranquia[0].idFranquia, respostaFranquia[0].fkEmpresa)
                            .then((resultadoCadastrarTotem => {
                                res.json(resultadoCadastrarTotem)
                            })).catch(
                                (erro) => {
                                    console.log(erro)
                                    console.log(
                                        "\nHouve um erro ao cadastrar o totem! Erro:",
                                        erro.sqlMessage
                                    )
                                    res.status(500).json(erro.sqlMessage)
                                }
                            )
                        }else {
                            res.status(404).send("Franquia não encontrada!")
                        }
                }).catch(
                    (erro) => {
                        console.log(erro)
                        console.log(
                            "\nHouve um erro ao autenticar a franquia! Erro:",
                            erro.sqlMessage
                        )
                        res.status(500).json(erro.sqlMessage)
                    }
                )
                
            }else {
                res.status(404).send("Tecnico não encontrado!")
            }
        }).catch(
            (erro) => {
                console.log(erro)
                console.log(
                    "\nHouve um erro ao autenticar o técnico! Erro:",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
    }
}
module.exports = {
    cadastrarTotem
}