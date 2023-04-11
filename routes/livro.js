const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA OS LIVROS CADASTRADOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT Nome, Autor, Editora, Ano, Preco FROM Livro;',
            (error, resultado, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    });
    
});
//CADASTRA UM NOVO LIVRO NO BANCO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'INSERT INTO Livro (Nome, Autor, Editora, Ano, Preco) VALUES (?,?,?,?,?)',
            [req.body.nome, req.body.autor, req.body.editora, req.body.ano, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };

                res.status(201).send({
                    mensagem: 'Livro cadastrado com sucesso!'
                })
            }
        )
    })
});
//RETORNA OS DADOS DE UM LIVRO
router.get('/:CodLivro', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT Nome, Autor, Editora, Ano, Preco FROM Livro WHERE CodLivro = ?;',
            [req.params.CodLivro],
            (error, resultado, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});
//ALTERA UM LIVRO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            `UPDATE Livro SET Nome = ?, Autor = ?, Editora = ?, Ano = ?, Preco = ? WHERE CodLivro = ?`,
            [req.body.Nome, req.body.Autor, req.body.Editora, req.body.Ano, req.body.Preco, req.body.CodProduto],
            (error, resultado, field) => {
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };

                res.status(202).send({
                    mensagem: 'Livro Alterado com sucesso!'
                })
            }
        )
    })
});
//EXCLUI UM LIVRO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de solicitacao'
    });
});

module.exports = router;