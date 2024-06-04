var database = require("../database/config")

function buscarTotens(fkFranquia) {
    var instrucao = `
        select codigoTotem from totem where fkFranquia = ${fkFranquia};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscaDados(fkTotem) {
    var instrucao = `
        select count(tipoAlerta) as 'qtdAlerta', diaDaSemana from alerta where year(dataAlerta) = year(CURDATE()) and WEEKOFYEAR(dataAlerta) = WEEKOFYEAR(CURDATE()) and fkTotem = ${fkTotem} group by diaDaSemana order by diaDaSemana;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarTotens,
    buscaDados
}