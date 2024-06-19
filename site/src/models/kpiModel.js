var database = require("../database/config")

function buscaDados(fkTotem) {
    //select count(tipoAlerta) as 'qtdAlerta' , fkTotem from alerta where tipoAlerta in ('AMARELO','VERMELHO')  and dataAlerta = current_date() and fkTotem = ${fkTotem} group by fkTotem;
    var instrucao = `
    SELECT COUNT(tipoAlerta) AS qtdAlerta, fkTotem FROM alerta WHERE tipoAlerta IN ('AMARELO', 'VERMELHO') AND CAST(dataAlerta AS DATE) = CAST(GETDATE() AS DATE) AND fkTotem = ${fkTotem} GROUP BY fkTotem;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAjustes(fkFranquia) {
    // select diaReinicializacao, horaReinicializacao from ajuste where fkFranquia = ${fkFranquia};
    var instrucao = `
        SELECT
        diaReinicializacao AS diaReinicializacao,
        CONVERT(CHAR(5), horaReinicializacao, 108) AS horaReinicializacao
        FROM
        ajuste where fkFranquia = ${fkFranquia};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDataHora(fkTotem) {
    // select dataHora, fkTotem from dadosHardWare where fkTotem = ${fkTotem} and DATE(dataHora) = current_date() order by dataHora desc limit 1;
    var instrucao = `
        SELECT TOP 1 dataHora, fkTotem
        FROM dadosHardWare
        WHERE fkTotem = ${fkTotem} AND CAST(dataHora AS DATE) = CAST(GETDATE() AS DATE)
        ORDER BY dataHora DESC;
    
        `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscaDados,
    buscarAjustes,
    buscarDataHora
}