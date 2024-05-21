var database = require("../database/config")

function cadastrar(codigoTotem) {
    var instrucao = `
        INSERT INTO totem (codigoTotem) VALUES ('${codigoTotem}');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
}