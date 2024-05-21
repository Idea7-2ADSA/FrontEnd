function cadastrarTotem() {
    var email = sessionStorage.EMAIL
    var senha = senhaCadastroTotem.value
    var codigoTotem = Number(codigoTotemCadastro.value)

    fetch("/totem/cadastrarTotem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha,
            codigoServer: codigoTotem
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta.status)
                console.log("Totem cadastrado!")
            } else if(resposta.status == 404) {
                throw "Erro ao encontrar login do técnico!";
            }else {
                throw "Erro ao tentar cadastrar um totem!"
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}