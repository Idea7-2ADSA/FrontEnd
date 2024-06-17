IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ideabd')
BEGIN
    CREATE DATABASE ideabd;
END
GO

USE ideabd;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    cnpj VARCHAR(45)
);
GO

CREATE TABLE franquia (
    idFranquia INT PRIMARY KEY IDENTITY(1,1),
    nomeFranquia VARCHAR(45),
    cep VARCHAR(45),
    logradouro VARCHAR(45),
    numero VARCHAR(45),
    complemento VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT FK_Franquia_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
GO

CREATE TABLE gerente (
    idGerente INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    cpf VARCHAR(45),
    telefone CHAR(15),
    email VARCHAR(45),
    senha VARCHAR(45),
    fkFranquia INT,
    fkEmpresa INT,
    CONSTRAINT FK_Gerente_Franquia FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia),
    CONSTRAINT FK_Gerente_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
GO

CREATE TABLE tecnico (
    idTecnico INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45)
);
GO

CREATE TABLE chamado (
    idChamado INT PRIMARY KEY IDENTITY(1,1),
    dataHoraAbertura DATETIME,
    dataHoraFechamento DATETIME,
    statusChamado VARCHAR(45),
    fkTecnico INT,
    fkFranquia INT,
    fkEmpresa INT,
    CONSTRAINT FK_Chamado_Tecnico FOREIGN KEY (fkTecnico) REFERENCES tecnico(idTecnico),
    CONSTRAINT FK_Chamado_Franquia FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia),
    CONSTRAINT FK_Chamado_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
GO


CREATE TABLE totem (
    codigoTotem INT PRIMARY KEY,
    hostName VARCHAR(45),
    fkFranquia INT,
    fkEmpresa INT,
    CONSTRAINT FK_Totem_Franquia FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia),
    CONSTRAINT FK_Totem_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
GO

CREATE TABLE ajuste (
    idAjuste INT PRIMARY KEY IDENTITY(1,1),
    diaReinicializacao VARCHAR(45),
    horaReinicializacao TIME,
    fkGerente INT,
    fkFranquia INT,
    CONSTRAINT FK_Ajuste_Gerente FOREIGN KEY (fkGerente) REFERENCES gerente(idGerente),
    CONSTRAINT FK_Ajuste_Franquia FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia)
);
GO

CREATE TABLE relatorioReinicializacao (
    idRelatorio INT PRIMARY KEY IDENTITY(1,1),
    statusReinicializacao VARCHAR(45),
    dataHoraInicio DATETIME,
    dataHoraFim DATETIME,
    fkTotem INT,
    CONSTRAINT FK_RelatorioReinicializacao_Totem FOREIGN KEY (fkTotem) REFERENCES totem(codigoTotem)
);
GO


CREATE TABLE relatorio (
    idRelatorio INT PRIMARY KEY IDENTITY(1,1),
    relatorioTotem VARCHAR(1000),
    dataHora DATETIME,
    fkFranquia INT,
    fkEmpresa INT,
    CONSTRAINT FK_Relatorio_Franquia FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia),
    CONSTRAINT FK_Relatorio_Empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
GO

CREATE TABLE hardware (
    idHardWare INT PRIMARY KEY IDENTITY(1,1),
    tipo VARCHAR(45),
    fkTotem INT,
    CONSTRAINT FK_Hardware_Totem FOREIGN KEY (fkTotem) REFERENCES totem(codigoTotem)
);
GO

CREATE TABLE caracteristicaHardware (
    idCaracteristica INT PRIMARY KEY IDENTITY(1,1),
    tipo VARCHAR(45),
    dado VARCHAR(45),
    fkHardWare INT,
    fkTotem INT,
    CONSTRAINT FK_CaracteristicaHardware_Hardware FOREIGN KEY (fkHardWare) REFERENCES hardware(idHardWare),
    CONSTRAINT FK_CaracteristicaHardware_Totem FOREIGN KEY (fkTotem) REFERENCES totem(codigoTotem)
);


CREATE TABLE dadosHardWare (
    idDados INT PRIMARY KEY IDENTITY(1,1),
    porcentagemUso BIGINT,
    dataHora VARCHAR(45),
    nomeComponente VARCHAR(45),
    fkHardWare INT,
    fkTotem INT,
    CONSTRAINT FK_DadosHardWare_Hardware FOREIGN KEY (fkHardWare) REFERENCES hardware(idHardWare),
    CONSTRAINT FK_DadosHardWare_Totem FOREIGN KEY (fkTotem) REFERENCES totem(codigoTotem)
);
GO


CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY IDENTITY(1,1),
    tipoAlerta VARCHAR(45),
    hardWareCorrespondente VARCHAR(45),
    diaDaSemana INT,
    dataAlerta DATE,
    fkTotem INT,
    CONSTRAINT FK_Alerta_Totem FOREIGN KEY (fkTotem) REFERENCES totem(codigoTotem)
);
GO]INSERT INTO empresa (nome, cnpj) VALUES
('McDonals', '42.591.651/0001-43');

-- Insert into franquia
INSERT INTO franquia (nome, cep, bairro, numero, complemento, empresa_id) VALUES
('Mc1000', '01310-200', 'Bela Vista', '1811', '', 1),
('McDonald''s', '01310-100', 'Bela Vista', '810', '', 1),
('McDonald''s', '01310-928', 'Bela Vista', '2064', '', 1),
('McDonald''s', '06460-030', 'Tamboré', '669', '', 1),
('McDonald''s', '06090-023', 'Centro', '3330', '', 1),
('McDonald''s', '01502-001', 'Liberdade', '774', '', 1),
('McDonald''s', '03011-000', 'Brás', '440/442', '', 1);

-- Insert into gerente
INSERT INTO gerente (nome, cpf, telefone, email, senha, franquia_id, empresa_id) VALUES
('Maria Brasil', '123.456.789-01', '(11) 98765-4321', 'maria.brasil@gmail.com', 'maria123', 1, 1),
('Vitor Tigre', '987.654.321-02', '(21) 91234-5678', 'vitor.tigre@gmail.com', 'vitor123', 1, 1),
('Daniel Ricardo', '111.222.333-03', '(31) 99876-5432', 'daniel.ricardo@gmail.com', 'daniel123', 2, 1)
('Julia Hikari', '382.878.658-83', '(11) 96490-6490', 'julia.hikari28@gmail.com', 'urubu100', 3, 1);

-- Insert into tecnico
INSERT INTO tecnico (nome, email, senha) VALUES
('Gustavo Antunes', 'gustavo.antunes@gmail.com', 'gustavo123'),
('Julia Hikari', 'julia.hikari@gmail.com', 'julia123');

-- Insert into totem
INSERT INTO totem (id, franquia_id, empresa_id) VALUES
(184329, 1, 1),
(597481, 1, 1),
(902173, 1, 1),
(375290, 1, 1),
(816453, 2, 1),
(470561, 2, 1),
(239846, 2, 1),
(682391, 2, 1),
(537104, 3, 1),
(128374, 3, 1),
(916527, 3, 1),
(304685, 3, 1),
(751239, 4, 1),
(847593, 4, 1),
(621908, 4, 1),
(439275, 4, 1),
(582613, 5, 1),
(760294, 5, 1),
(194736, 5, 1),
(835142, 5, 1),
(267483, 6, 1),
(948210, 6, 1),
(573821, 6, 1),
(310694, 6, 1),
(624159, 7, 1),
(789302, 7, 1),
(452170, 7, 1),
(901635, 7, 1);

-- Insert into ajuste
INSERT INTO ajuste (tipo, hora, empresa_id) VALUES
('1', '00:00:00', 1),
('1', '00:00:00', 2),
('1', '00:00:00', 3),
('1', '00:00:00', 4),
('1', '00:00:00', 5),
('1', '00:00:00', 6),
('1', '00:00:00', 7);

-- User creation and permissions
CREATE LOGIN usuario WITH PASSWORD = 'usuario';
CREATE USER usuario FOR LOGIN usuario;
ALTER SERVER ROLE db_datareader ADD MEMBER usuario;
ALTER SERVER ROLE db_datawriter ADD MEMBER usuario;