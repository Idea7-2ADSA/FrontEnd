var database = require("../database/config")

function ajustarParametros(diaReinicializacao, horaReinicializacao, fkGerente, fkFranquia) {
    var instrucao = `
    UPDATE ajuste 
    SET diaReinicializacao = '${diaReinicializacao}', 
        horaReinicializacao = '${horaReinicializacao}', 
        fkGerente = ${fkGerente} 
    WHERE fkFranquia = ${fkFranquia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    ajustarParametros
}