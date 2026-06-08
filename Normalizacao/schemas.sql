-- ============================================================
-- Atividade 8 - Normalização de Dados e Arquitetura de Software
-- Schemas propostos após aplicação de 1FN, 2FN e 3FN
-- ============================================================


-- ============================================================
-- EXERCÍCIO 1 — Tabela de Matrículas (1FN)
-- Violação: colunas multivaloradas (disciplinas e notas)
-- ============================================================

CREATE TABLE matriculas (
    matricula_id  INT           NOT NULL,
    aluno_nome    VARCHAR(100)  NOT NULL,
    disciplina    VARCHAR(100)  NOT NULL,
    nota          DECIMAL(4,1),
    PRIMARY KEY (matricula_id, disciplina)
);

-- Ana Lima passa de 1 linha (com lista) para 3 linhas (uma por disciplina)
INSERT INTO matriculas VALUES
    (1, 'Ana Lima', 'Matemática', 8.5),
    (2, 'Ana Lima', 'Física',     7.0),
    (3, 'Ana Lima', 'Química',    9.0);


-- ============================================================
-- EXERCÍCIO 2 — Tabela de Vendas (3FN)
-- Cadeia transitiva: venda_id → departamento → gerente_nome
-- ============================================================

CREATE TABLE departamentos (
    departamento_id  INT           NOT NULL PRIMARY KEY,
    nome             VARCHAR(100)  NOT NULL,
    gerente_nome     VARCHAR(100)  NOT NULL
);

CREATE TABLE vendas (
    venda_id         INT            NOT NULL PRIMARY KEY,
    produto          VARCHAR(100)   NOT NULL,
    departamento_id  INT            NOT NULL REFERENCES departamentos(departamento_id),
    valor            DECIMAL(10,2)  NOT NULL
);

-- Trocar o gerente de Eletrônicos: 1 UPDATE em departamentos, zero risco de inconsistência
UPDATE departamentos SET gerente_nome = 'Roberto Lima' WHERE departamento_id = 1;


-- ============================================================
-- EXERCÍCIO 3 — Sistema de Restaurante (1FN → 2FN → 3FN)
-- ============================================================

-- 1FN: eliminar itens/qtds/precos multivalorados
-- 2FN: separar dependências parciais da PK composta (pedido_id, item_nome)
-- 3FN: sem dependências transitivas restantes

CREATE TABLE pedidos (
    pedido_id     INT           NOT NULL PRIMARY KEY,
    mesa          SMALLINT      NOT NULL,
    cliente_nome  VARCHAR(100)  NOT NULL
);

CREATE TABLE cardapio (
    item_nome    VARCHAR(100)   NOT NULL PRIMARY KEY,
    preco_unit   DECIMAL(8,2)   NOT NULL
);

-- total NÃO é armazenado — calculado via query para evitar inconsistência
CREATE TABLE itens_pedido (
    pedido_id  INT           NOT NULL REFERENCES pedidos(pedido_id),
    item_nome  VARCHAR(100)  NOT NULL REFERENCES cardapio(item_nome),
    qtd        SMALLINT      NOT NULL DEFAULT 1,
    PRIMARY KEY (pedido_id, item_nome)
);

-- Query que calcula o total sempre consistente
-- SELECT p.pedido_id, p.cliente_nome, SUM(i.qtd * c.preco_unit) AS total
-- FROM pedidos p
-- JOIN itens_pedido i ON i.pedido_id = p.pedido_id
-- JOIN cardapio c     ON c.item_nome = i.item_nome
-- GROUP BY p.pedido_id, p.cliente_nome;


-- ============================================================
-- EXERCÍCIO 4 — Gestão de Biblioteca (2FN)
-- Dependências parciais: titulo_livro depende só de livro_id,
--                        usuario_email depende só de usuario_id
-- ============================================================

CREATE TABLE livros (
    livro_id     INT           NOT NULL PRIMARY KEY,
    titulo_livro VARCHAR(200)  NOT NULL
);

CREATE TABLE usuarios (
    usuario_id    INT           NOT NULL PRIMARY KEY,
    usuario_email VARCHAR(150)  NOT NULL UNIQUE
);

-- Livro pode ser cadastrado antes do primeiro empréstimo (anomalia de inserção eliminada)
CREATE TABLE emprestimos (
    livro_id         INT   NOT NULL REFERENCES livros(livro_id),
    usuario_id       INT   NOT NULL REFERENCES usuarios(usuario_id),
    data_emprestimo  DATE  NOT NULL,
    PRIMARY KEY (livro_id, usuario_id)
);


-- ============================================================
-- EXERCÍCIO 5 — Sistema de Clínica (3FN do zero)
-- Violações encontradas:
--   1FN: procedimentos multivalorado
--   3FN: plano_cobertura depende de plano_saude (transitiva)
--   3FN: medico_nome/especialidade dependem de medico_crm (transitiva)
--   3FN: sala_andar depende de sala_numero (transitiva)
-- ============================================================

CREATE TABLE pacientes (
    paciente_id   INT           NOT NULL PRIMARY KEY,
    paciente_cpf  CHAR(11)      NOT NULL UNIQUE,
    paciente_nome VARCHAR(100)  NOT NULL
);

CREATE TABLE planos_saude (
    plano_id         INT           NOT NULL PRIMARY KEY,
    plano_nome       VARCHAR(100)  NOT NULL UNIQUE,
    plano_cobertura  SMALLINT      NOT NULL  -- percentual ex: 80
);

CREATE TABLE medicos (
    medico_id     INT           NOT NULL PRIMARY KEY,
    medico_crm    VARCHAR(20)   NOT NULL UNIQUE,
    medico_nome   VARCHAR(100)  NOT NULL,
    especialidade VARCHAR(100)  NOT NULL
);

CREATE TABLE salas (
    sala_id      INT          NOT NULL PRIMARY KEY,
    sala_numero  SMALLINT     NOT NULL UNIQUE,
    sala_andar   SMALLINT     NOT NULL
);

CREATE TABLE consultas (
    consulta_id  INT       NOT NULL PRIMARY KEY,
    paciente_id  INT       NOT NULL REFERENCES pacientes(paciente_id),
    plano_id     INT       NOT NULL REFERENCES planos_saude(plano_id),
    medico_id    INT       NOT NULL REFERENCES medicos(medico_id),
    sala_id      INT       NOT NULL REFERENCES salas(sala_id),
    data_hora    TIMESTAMP NOT NULL
);

-- Resolve o atributo multivalorado (1FN)
CREATE TABLE consulta_procedimentos (
    id            INT           NOT NULL PRIMARY KEY,
    consulta_id   INT           NOT NULL REFERENCES consultas(consulta_id),
    procedimento  VARCHAR(150)  NOT NULL
);

-- Reflexão: alterar cobertura da Unimed de 80% para 70%
-- Modelo normalizado → 1 UPDATE, 1 tabela, 0 risco de inconsistência:
UPDATE planos_saude SET plano_cobertura = 70 WHERE plano_nome = 'Unimed';

-- Modelo flat → N UPDATEs em toda a tabela de consultas:
-- UPDATE consultas SET plano_cobertura = 70 WHERE plano_saude = 'Unimed';  ← O(n)
