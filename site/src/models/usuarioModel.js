var database = require("../database/config")

function buscarDadosFranquia(idFranquia) {
    var instrucao = `
        select cep from franquia where idFranquia = ${idFranquia}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarGerente(email, senha) {
    var instrucao = `
        SELECT idGerente, nome, email, cpf, fkFranquia FROM gerente WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticarTecnico(email, senha) {
    var instrucao = `
        SELECT idTecnico, nome, email FROM tecnico where email = '${email}' AND senha = '${senha}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, cpf, telefone, email, senha, fkFranquia, fkEmpresa) {
    var instrucao = `
        INSERT INTO gerente (nome, cpf, telefone, email, senha, fkFranquia, fkEmpresa) VALUES ('${nome}', '${cpf}', '${telefone}', '${email}', '${senha}', '${fkFranquia}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticarGerente,
    autenticarTecnico,
    cadastrar,
    buscarDadosFranquia
};