function integracaoComTelegram(totalAlertasNovo, alertasPorTotem) {
    var botToken = "6809526672:AAEmxwT2JFhnJdb3b0pfHyDdiyggrw_lysg";
    var url = `https://api.telegram.org/bot${botToken}/getUpdates`;
    var ids = [];
    var sobrenomes = [];
    var cep = window.sessionStorage.getItem('CEPFRANQUIA');

    console.log(cep);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                data.result.forEach(update => {
                    var chat = update.message.chat;
                    ids.push(chat.id);
                    sobrenomes.push(chat.last_name);
                });
                console.log(ids);
                console.log(sobrenomes);

                var posicao;

                for (var i = 0; i < sobrenomes.length; i++) {
                    if (sobrenomes[i] == cep) {
                        posicao = i;
                    }
                }

                var idMensagem = ids[posicao];
                console.log("ID do CEP é " + idMensagem);

                var alertasTotensTexto = Object.entries(alertasPorTotem)
                    .map(([totem, alertas]) => `• Totem ${totem}: ${alertas.alertas.reduce((a, b) => a + b, 0)} alertas`)
                    .join('\n');

                var messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
                var messageData = {
                    chat_id: idMensagem,
                    text: `Olá, a Idea7 informa que o seu totem teve um novo alerta!\n\nAqui está a quantidade de alertas por totem:\n${alertasTotensTexto}\nTotal: ${totalAlertasNovo} alertas`
                };

                fetch(messageUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Mensagem enviada", data);
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar atualizações do Telegram:', error);
        });
}
