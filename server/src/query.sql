-- query.sql
-- Query para criar o banco de dados no MySQL

-- CREATE SCHEMA db; -- caso nao tenha o schema criado na sua máquina, utilize esse comando.

USE db;

CREATE TABLE unidade (
    idunidade INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE setor (
    idsetor INT PRIMARY KEY AUTO_INCREMENT,
    setor VARCHAR(45) NOT NULL
);

CREATE TABLE cargo (
    idcargo INT PRIMARY KEY AUTO_INCREMENT,
    cargo VARCHAR(45) NOT NULL,
    idsetor INT,
    FOREIGN KEY (idsetor) REFERENCES setor (idsetor)
);

CREATE TABLE usuarios (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idcargo INT,
    idrole INT,
    FOREIGN KEY (idcargo) REFERENCES cargo (idcargo),
    FOREIGN KEY (idrole) REFERENCES roles (idrole)
);

CREATE TABLE aprovadores (
    idaprovador INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(45) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    idusuario INT,
    FOREIGN KEY (idusuario) REFERENCES usuarios (idusuario)
);

CREATE TABLE roles (
    idrole INT PRIMARY KEY,
    role_name VARCHAR(45) UNIQUE NOT NULL
);

-- Inserir os tipos de usuário
INSERT INTO
    roles (idrole, role_name)
VALUES (1, 'Funcionario'),
    (2, 'Administrador'),
    (3, 'Gerente');

CREATE TABLE solicitacoes (
    idsolicitacao INT PRIMARY KEY AUTO_INCREMENT,
    idusuario INT,
    idaprovador INT,
    status TINYINT NOT NULL,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_pedido DECIMAL(10, 2) NOT NULL,
    valor_aprovado DECIMAL(10, 2),
    tipo_dedutivel VARCHAR(45),
    dt_aprovacao TIMESTAMP,
    descricao VARCHAR(250),
    categoria VARCHAR(15),
    FOREIGN KEY (idusuario) REFERENCES usuarios (idusuario),
    FOREIGN KEY (idaprovador) REFERENCES aprovadores (idaprovador)
);

CREATE TABLE nfs (
    idnfs INT PRIMARY KEY AUTO_INCREMENT,
    anexo LONGBLOB NOT NULL,
    idsolicitacao INT,
    FOREIGN KEY (idsolicitacao) REFERENCES solicitacoes (idsolicitacao)
);

CREATE TABLE relatorios (
    idrelatorios INT PRIMARY KEY AUTO_INCREMENT,
    dt_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE relatorio_solicitacoes (
    idsolicitacao INT,
    idrelatorio VARCHAR(45),
    FOREIGN KEY (idsolicitacao) REFERENCES solicitacoes(idsolicitacao),
    FOREIGN KEY (idrelatorio) REFERENCES relatorios(idrelatorios)
);

CREATE TABLE setor_unidade (
    idsetor INT,
    idunidade INT,
    FOREIGN KEY (idsetor) REFERENCES setor (idsetor),
    FOREIGN KEY (idunidade) REFERENCES unidade (idunidade)
);

CREATE TABLE notificacao (
    idnotificacao INT,
    mensagem VARCHAR(250),
    idusuario INT,
    aprovador INT,
    idsolicitacao INT,
    FOREIGN (idusuario) REFERENCES usuarios (idusuario),
    FOREIGN (idaprovador) REFERENCES aprovadores (idaprovador),
    FOREIGN (idsolicitacao) REFERENCES solicitacoes (idsolicitacao),
)