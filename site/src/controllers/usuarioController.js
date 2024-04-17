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

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } 
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else if(cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
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