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
        SELECT a.idAlerta, a.tipoAlerta, t.codigoTotem AS fkTotem FROM (SELECT * FROM alerta WHERE dataAlerta = CURDATE() AND fkTotem = ${fkTotem} ORDER BY idAlerta DESC LIMIT 1) AS a RIGHT JOIN (SELECT ${fkTotem} AS codigoTotem) AS t ON a.fkTotem = t.codigoTotem;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTotens(fkFranquia) {
    var instrucao = `
        select fkFranquia, codigoTotem from totem where fkFranquia = ${fkFranquia};    
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarComponente(fkTotem, tipoComponente) {
    var instrucao = `
        select idHardWare, tipo from hardware where fkTotem = ${fkTotem} and tipo = '${tipoComponente}'
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadoHardWare(fkHardWare, fkTotem) {
    var instrucao = `
        SELECT MAX(porcentagemUso) AS MaxUsoCPU FROM dadosHardWare WHERE fkHardWare = ${fkHardWare} AND fkTotem = ${fkTotem} AND DATE(dataHora) = CURDATE();
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosHardWare(fkHardWare, fkTotem) {
    var instrucao = `
        SELECT porcentagemUso, time_format(dataHora, '%H:%i:%s') as horario FROM dadosHardWare WHERE fkHardWare = ${fkHardWare} and fkTotem = ${fkTotem} and DATE(dataHora) = curdate() order by dataHora desc limit 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    buscarAlertas,
    buscarTotens,
    buscarComponente,
    buscarDadoHardWare,
    buscarDadosHardWare
}