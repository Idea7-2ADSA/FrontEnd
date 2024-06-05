var database = require("../database/config")

function buscaDados(fkTotem) {
    var instrucao = `
        select count(tipoAlerta) as 'qtdAlerta' , fkTotem from alerta where tipoAlerta in ('AMARELO','VERMELHO')  and dataAlerta = current_date() and fkTotem = ${fkTotem} group by fkTotem;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarAjustes(fkFranquia) {
    var instrucao = `
        select diaReinicializacao, horaReinicializacao from ajuste where fkFranquia = ${fkFranquia};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDataHora(fkTotem) {
    var instrucao = `
        select dataHora, fkTotem from dadosHardWare where fkTotem = ${fkTotem} order by dataHora desc limit 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscaDados,
    buscarAjustes,
    buscarDataHora
}