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
        SELECT 
            COUNT(tipoAlerta) AS qtdAlerta, 
            DATENAME(WEEKDAY, dataAlerta) AS diaDaSemana 
        FROM alerta 
        WHERE 
            YEAR(dataAlerta) = YEAR(GETDATE()) 
            AND DATEPART(WEEK, dataAlerta) = DATEPART(WEEK, GETDATE()) 
            AND fkTotem = ${fkTotem} 
        GROUP BY DATENAME(WEEKDAY, dataAlerta) 
        ORDER BY diaDaSemana;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    buscarTotens,
    buscaDados
}