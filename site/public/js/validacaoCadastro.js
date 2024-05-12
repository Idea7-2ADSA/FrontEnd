function cadastrar() {
    var nomeCadastro = nome.value
    var cepCadastro = cep.value
    var emailCadastro = email.value
    var senhaCadastro = senha.value
    var confirmacaoSenha = confirmacao_senha.value
    validarNome(nomeCadastro)
    validarCep(cepCadastro)
    validarEmail(emailCadastro)
    validarSenha(senhaCadastro, confirmacaoSenha)

    if(validarNome && validarCep && validarEmail && validarSenha) {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeCadastro,
                cepServer: cepCadastro,
                emailServer: emailCadastro,
                senhaServer: senhaCadastro
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    window.location = "./login.html"
                } else {
                    if (resposta.status == 401) {
                        alert(`O email cadastrado já existe!`)
                    } else {
                        throw "Houve um erro ao tentar realizar o cadastro!";
                    }
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        return false;
    }
}

function validarNome(nome) {
    if(nome.length >= 3 && nome.match(/[A-Z][a-z].*/ig)) {
        return true
    }else {
        return false
    }
}

function validarCep(cep) {
    if(cep.match(/\d{5}-\d{3}/)) {
        return true
    }else {
        return false
    }
}

function validarEmail(email) {
    if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return true
    }else {
        return false
    }
}

function validarSenha(senha, confirmacaoSenha) {
    if(senha == confirmacaoSenha && senha.length >= 6) {
        return true
    }else {
        return false
    }
}