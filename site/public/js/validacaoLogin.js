function login() {
    emailLogin = email.value
    senhaLogin = senha.value

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailLogin,
            senhaServer: senhaLogin
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                console.log(resposta.status)
                resposta.json().then(json => {
                    console.log(JSON.stringify(json))
                    sessionStorage.ID = json.id;
                    sessionStorage.NOME = json.nome;
                    sessionStorage.EMAIL = json.email;
                    sessionStorage.CPF = json.cpf;
                    if (resposta.status == 201) {
                        sessionStorage.IDFRANQUIA = json.franquia;
                        sessionStorage.CEPFRANQUIA = json.cepFranquia;
                        window.location = "../dashboard/index.html";
                    } else if (resposta.status == 202) {
                        window.location = "./dashboard-tecnico/index.html";
                    }                    
                });
            } else {
                throw "Houve um erro ao tentar realizar o login!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}