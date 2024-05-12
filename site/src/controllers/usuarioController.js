var usuarioModel = require("../models/usuarioModel");
var franquiaModel = require("../models/franquiaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.autenticarGerente(email, senha)
            .then((resultadoAutenticarGerente) => {
                console.log(`\nResultado encontrados: ${resultadoAutenticarGerente.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticarGerente)}`);

                if(resultadoAutenticarGerente.length == 1) {
                    res.status(201).json({
                        id: resultadoAutenticarGerente[0].idGerente,
                        nome: resultadoAutenticarGerente[0].nome,
                        email: resultadoAutenticarGerente[0].email
                    });
                }else if(resultadoAutenticarGerente.length == 0) {
                    usuarioModel.autenticarTecnico(email, senha)
                        .then((resultadoAutenticarTecnico) => {
                            console.log(`\nResultado encontrados: ${resultadoAutenticarTecnico.length}`);
                            console.log(`Resultados: ${JSON.stringify(resultadoAutenticarTecnico)}`);
                            if(resultadoAutenticarTecnico.length == 1) {
                                res.status(202).json({
                                    id: resultadoAutenticarTecnico[0].idTecnico,
                                    nome: resultadoAutenticarTecnico[0].nome,
                                    email: resultadoAutenticarTecnico[0].email 
                                });
                            }else {
                                res.status(403).send("Email e/ou senha inválido(s)")
                            }
                        }
                        ).catch((erro) => {
                            console.log(erro);
                            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                            console.log("Erro no login tecnico!")
                            res.status(500).json(erro.sqlMessage);
                        }
                        );
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    console.log("Erro no login gerente!")
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cep = req.body.cepServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if(cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        franquiaModel.consultarFranquia(cep)
        .then(
            (resFranquia) => {
                if(resFranquia.length > 0) {
                    usuarioModel.cadastrar(nome, email, senha, resFranquia[0].idFranquia, resFranquia[0].fkEmpresa)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                            );
                            if(erro.sqlMessage == `Duplicate entry '${email}' for key 'usuario.email'`) {
                                res.status(401).json(erro.sqlMessage);
                            }else{
                                res.status(500).json(erro.sqlMessage);
                            }
                        }
                    )
                }else {
                    console.log("\nFranquia não encontrada");
                }
            }
            
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao consultar o franquia! Erro: "
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = {
    autenticar,
    cadastrar
}