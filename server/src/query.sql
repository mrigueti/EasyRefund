-- Active: 1731508464914@@127.0.0.1@3306@easyrefund
CREATE SCHEMA EasyRefund;

USE EasyRefund;

-- Criando tabela de Unidades
CREATE TABLE unidades (
    id_unidade INT PRIMARY KEY AUTO_INCREMENT,
    nome_unidade VARCHAR(45) NOT NULL
);

-- Criando tabela de Setores
CREATE TABLE setores (
    id_setor INT PRIMARY KEY AUTO_INCREMENT,
    nome_setor VARCHAR(45) NOT NULL
);

-- Criando tabela de Cargos (relacionado com setores)
CREATE TABLE cargos (
    id_cargo INT PRIMARY KEY AUTO_INCREMENT,
    nome_cargo VARCHAR(45) NOT NULL,
    id_setor INT,
    FOREIGN KEY (id_setor) REFERENCES setores(id_setor)
);

-- Criando tabela de Usuários
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(45) NOT NULL,
    cpf_usuario CHAR(11),
    email_usuario VARCHAR(45) NOT NULL,
    senha_usuario VARCHAR(255) NOT NULL,  -- Corrigido para tamanho ideal para senhas
    dt_criacao_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_cargo INT,
    id_unidade INT,  -- Chave estrangeira para unidade
    id_setor INT,    -- Chave estrangeira para setor
    role_nome ENUM('Funcionário', 'Aprovador', 'Gerente', 'Administrador') DEFAULT 'Funcionário',
    FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo),
    FOREIGN KEY (id_unidade) REFERENCES unidades(id_unidade),  -- Relacionamento com unidades
    FOREIGN KEY (id_setor) REFERENCES setores(id_setor)         -- Relacionamento com setores
);

-- Criando tabela de Aprovadores
CREATE TABLE aprovadores (
    id_aprovador INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Criando tabela de Solicitações
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
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_aprovador) REFERENCES aprovadores(id_aprovador)
);

-- Criando tabela de Notas Fiscais
CREATE TABLE nfs (
    id_nf INT PRIMARY KEY AUTO_INCREMENT,
    anexo_nf LONGBLOB NOT NULL,
    id_solicitacao INT,
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes(id_solicitacao)
);

ALTER TABLE nfs 
MODIFY anexo_nf VARCHAR(255) NOT NULL;


-- Criando tabela de Setores e Unidades (relacionamento N:N entre Setores e Unidades)
CREATE TABLE setores_unidades (
    id_setor INT,
    id_unidade INT,
    PRIMARY KEY (id_setor, id_unidade),
    FOREIGN KEY (id_setor) REFERENCES setores(id_setor),
    FOREIGN KEY (id_unidade) REFERENCES unidades(id_unidade)
);

-- Criando tabela de Notificações
CREATE TABLE notificacoes (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    mensagem_notif VARCHAR(250),
    dt_criacao_notif TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_usuario INT,
    id_aprovador INT,
    id_solicitacao INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_aprovador) REFERENCES aprovadores(id_aprovador),
    FOREIGN KEY (id_solicitacao) REFERENCES solicitacoes(id_solicitacao)
);

-- Inserts para testes
INSERT INTO setores (nome_setor) VALUES ('TI'), ('RH'), ('Financeiro');

INSERT INTO unidades (nome_unidade) VALUES ('Unidade A'), ('Unidade B'), ('Unidade C');

-- Associando o setor 'TI' à 'Unidade A' e 'Unidade B'
INSERT INTO setores_unidades (id_setor, id_unidade) 
VALUES 
    ((SELECT id_setor FROM setores WHERE nome_setor = 'TI'), (SELECT id_unidade FROM unidades WHERE nome_unidade = 'Unidade A')),
    ((SELECT id_setor FROM setores WHERE nome_setor = 'TI'), (SELECT id_unidade FROM unidades WHERE nome_unidade = 'Unidade B'));

-- Associando o setor 'RH' à 'Unidade B' e 'Unidade C'
INSERT INTO setores_unidades (id_setor, id_unidade) 
VALUES 
    ((SELECT id_setor FROM setores WHERE nome_setor = 'RH'), (SELECT id_unidade FROM unidades WHERE nome_unidade = 'Unidade B')),
    ((SELECT id_setor FROM setores WHERE nome_setor = 'RH'), (SELECT id_unidade FROM unidades WHERE nome_unidade = 'Unidade C'));

INSERT INTO cargos (nome_cargo, id_setor) 
VALUES 
    ('Desenvolvedor', (SELECT id_setor FROM setores WHERE nome_setor = 'TI')),
    ('Analista de RH', (SELECT id_setor FROM setores WHERE nome_setor = 'RH')),
    ('Gerente Financeiro', (SELECT id_setor FROM setores WHERE nome_setor = 'Financeiro'));

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
    (1, 1, 'Aprovada', 1500, 1300, TRUE, 'Reembolso de alimentação para evento.', 'Alimentação');

INSERT INTO nfs (anexo_nf, id_solicitacao) VALUES (0xFFD8FFE000104A464946, 1);


INSERT INTO notificacoes (
    mensagem_notif, id_usuario, id_aprovador, id_solicitacao
)
VALUES
    ('Sua solicitação foi aprovada.', 1, 1, 1);


-- selects

select * from usuarios;

SELECT * FROM aprovadores;

SELECT * FROM solicitacoes

SELECT 
      c.nome_cargo AS Cargo,
      s.nome_setor AS Setor,
      u.nome_unidade AS Unidade
    FROM 
      cargos c
    JOIN 
      setores s ON c.id_setor = s.id_setor
    JOIN 
      setores_unidades su ON s.id_setor = su.id_setor
    JOIN 
      unidades u ON su.id_unidade = u.id_unidade
    GROUP BY 
      c.nome_cargo, s.nome_setor, u.nome_unidade;
      
SELECT DISTINCT
    c.id_cargo,
    c.nome_cargo AS Cargo,
    s.nome_setor AS Setor,
    u.nome_unidade AS Unidade
FROM 
    cargos c
JOIN 
    setores s ON c.id_setor = s.id_setor
JOIN 
    setores_unidades su ON s.id_setor = su.id_setor
JOIN 
    unidades u ON su.id_unidade = u.id_unidade;


SELECT id_setor, nome_setor FROM setores;
SELECT id_unidade, nome_unidade FROM unidades;
SELECT id_setor, id_unidade FROM setores_unidades;

SELECT 
    c.id_cargo,
    c.nome_cargo AS Cargo,
    s.id_setor,
    s.nome_setor AS Setor,
    u.id_unidade,
    u.nome_unidade AS Unidade
FROM 
    cargos c
JOIN 
    setores s ON c.id_setor = s.id_setor
JOIN 
    setores_unidades su ON s.id_setor = su.id_setor
JOIN 
    unidades u ON su.id_unidade = u.id_unidade;


SELECT 
    s.id_solicitacao, 
    s.id_usuario, 
    s.id_aprovador, 
    s.status_solicitacao, 
    s.dt_criacao_solic, 
    s.valor_pedido_solic, 
    s.valor_aprovado_solic, 
    s.tipo_dedutivel_solic, 
    s.dt_aprovacao, 
    s.descricao, 
    s.categoria,
    n.id_nf,
    n.anexo_nf
FROM 
    solicitacoes s
LEFT JOIN 
    nfs n ON s.id_solicitacao = n.id_solicitacao;
