var database = require("../database/config")

function consultarFranquia(cep) {
    var instrucao = `
        SELECT idFranquia, fkEmpresa FROM franquia WHERE cep = '${cep}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarFranquias() {
    var instrucao = `
        select idFranquia, logradouro, numero from franquia;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    consultarFranquia,
    buscarFranquias
}