var database = require("../database/config")

function cadastrar(codigoTotem, idFranquia, fkEmpresa) {
    var instrucao = `
        INSERT INTO totem (codigoTotem, fkFranquia, fkEmpresa) VALUES ('${codigoTotem}', ${idFranquia}, ${fkEmpresa});
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAlertas(fkTotem) {
    instrucao = `
        SELECT a.tipoAlerta, t.codigoTotem AS fkTotem FROM (SELECT * FROM alerta WHERE dataAlerta = CURDATE() AND fkTotem = ${fkTotem} ORDER BY idAlerta DESC LIMIT 1) AS a RIGHT JOIN (SELECT ${fkTotem} AS codigoTotem) AS t ON a.fkTotem = t.codigoTotem;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    buscarAlertas
}