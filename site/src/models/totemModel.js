var database = require("../database/config")

function cadastrar(codigoTotem, idFranquia, fkEmpresa) {
    var instrucao = `
        INSERT INTO totem (codigoTotem, fkFranquia, fkEmpresa) VALUES ('${codigoTotem}', ${idFranquia}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
}