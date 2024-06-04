function cadastrar() {
    var nomeCadastro = nome.value
    var cepCadastro = cep.value
    var cpfCadastro = cpf.value
    var emailCadastro = email.value
    var senhaCadastro = senha.value
    var telefoneCadastro =telefone.value
    var confirmacaoSenha = confirmacao_senha.value

    if (validarNome(nomeCadastro) && validarCep(cepCadastro) && validarEmail(emailCadastro) && validarSenha(senhaCadastro, confirmacaoSenha)
         && validarCpf(cpfCadastro) && validarTelefone(telefoneCadastro)) {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeCadastro,
                cepServer: cepCadastro,
                emailServer: emailCadastro,
                senhaServer: senhaCadastro,
                cpfServer: cpfCadastro,
                telefoneServer: telefoneCadastro
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
        console.log("nome inválido")
        return false
    }
}

function validarCep(cep) {
    if(cep.match(/\d{5}-\d{3}/)) {
        return true
    }else {
        console.log("cep inválido")
        return false
    }
}

function validarEmail(email) {
    if(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        return true
    }else {
        console.log("email inválido")
        return false
    }
}

function validarSenha(senha, confirmacaoSenha) {
    if(senha == confirmacaoSenha && senha.length >= 6) {
        return true
    }else {
        console.log("senha inválida")
        return false
    }
}

function validarCpf(cpf) {
    if (cpf.match(/([0 - 9]{ 2}[\.]?[0 - 9]{ 3}[\.]?[0 - 9]{ 3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/ig)) {
        return true
    }else {
        console.log("cpf inválido")
        return false
    }
}

function validarTelefone(telefone) {
    if (telefone.match(/\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/)) {
        return true
    }else {
        console.log("telefone inválido")
        return false
    }
}