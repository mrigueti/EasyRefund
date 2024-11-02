CREATE SCHEMA db;

USE db;

-- Criando tabelas
CREATE TABLE unidades (
    id_unidade INT PRIMARY KEY AUTO_INCREMENT,
    nome_unidade VARCHAR(45) NOT NULL
);

CREATE TABLE setores (
    id_setor INT PRIMARY KEY AUTO_INCREMENT,
    nome_setor VARCHAR(45) NOT NULL
);

CREATE TABLE cargos (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(45) NOT NULL,
    id_setor INT,
    FOREIGN KEY (id_setor) REFERENCES setores (id_setor)
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(45) NOT NULL,
    cpf_usuario CHAR(11) NOT NULL,
    email_usuario VARCHAR(45) NOT NULL,
    senha_usuario VARCHAR(50) NOT NULL,
    dt_criacao_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_cargo INT,
    role_nome ENUM('Funcionário', 'Aprovador', 'Gerente', 'Administrador') DEFAULT 'Funcionário',
    FOREIGN KEY (id_cargo) REFERENCES cargos (id_cargo)
);

CREATE TABLE aprovadores (
    id_aprovador INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE solicitacoes (
    id_solicitacao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_aprovador INT,
    status_solicitacao ENUM('Pendente', 'Aprovada', 'Recusada') DEFAULT 'Pendente',
    dt_criacao_solic TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_pedido_solic DECIMAL(10, 2) NOT NULL,
    valor_aprovado_solic DECIMAL(10, 2),
    tipo_dedutivel_solic BOOLEAN,
    dt_aprovacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descricao VARCHAR(250) NOT NULL DEFAULT '',
    categoria ENUM('Alimentação', 'Transporte', 'Hospedagem', 'Outros') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_aprovador) REFERENCES aprovadores (id_aprovador)
);

CREATE TABLE nfs (
    id_nf INT PRIMARY KEY AUTO_INCREMENT,
    anexo_nf LONGBLOB NOT NULL,
    id_solicitacao INT,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes (id_solicitacao)
);

CREATE TABLE setores_unidades (
    id_setor INT,
    id_unidade INT,
    PRIMARY KEY (id_setor, id_unidade),
    FOREIGN KEY (id_setor) REFERENCES setores (id_setor),
    FOREIGN KEY (id_unidade) REFERENCES unidades (id_unidade)
);

CREATE TABLE notificacoes (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    mensagem_notif VARCHAR(250),
    dt_criacao_notif TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_usuario INT,
    id_aprovador INT,
    id_solicitacao INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_aprovador) REFERENCES aprovadores (id_aprovador),
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes (id_solicitacao)
);

-- Inserts para testes
INSERT INTO unidades (nome_unidade) VALUES ('Vitória');

INSERT INTO setores (nome_setor) VALUES ('Financeiro'), ('RH'), ('TI');

INSERT INTO cargos (nome_cargo, id_setor) VALUES 
    ('Analista de Sistema', 3),
    ('Analista de RH', 2),
    ('Analista Financeiro', 1);

INSERT INTO usuarios (
    nome_usuario, cpf_usuario, email_usuario, senha_usuario, id_cargo, role_nome
)
VALUES
    ('funcionario', '11111111111', 'funcionario@gmail.com', 'abc', 3, 'Funcionário'),
    ('aprovador', '22222222222', 'aprovador@gmail.com', 'abc', 1, 'Aprovador'),
    ('gerente', '33333333333', 'gerente@gmail.com', 'abc', 2, 'Gerente');

INSERT INTO aprovadores (id_usuario) VALUES (2);

INSERT INTO solicitacoes (
    id_usuario, id_aprovador, status_solicitacao, valor_pedido_solic, 
    valor_aprovado_solic, tipo_dedutivel_solic, descricao, categoria
)
VALUES
    (1, 2, 'Aprovada', 1500, 1300, TRUE, 'Reembolso de alimentação para evento.', 'Alimentação');

INSERT INTO nfs (anexo_nf, id_solicitacao) VALUES (0xFFD8FFE000104A464946, 1);

INSERT INTO setores_unidades (id_setor, id_unidade) VALUES (1, 1), (2, 1), (3, 1);

INSERT INTO notificacoes (
    mensagem_notif, id_usuario, id_aprovador, id_solicitacao
)
VALUES
    ('Sua solicitação foi aprovada.', 1, 2, 1);


-- selects