var database = require("../database/config")

function consultarFranquia(cep) {
    var instrucao = `
        SELECT idFranquia, fkEmpresa FROM franquia WHERE cep = '${cep}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    consultarFranquia
}