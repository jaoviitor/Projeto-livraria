const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA OS LIVROS CADASTRADOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Livro;',
            (error, result, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod =>{
                        return {
                            CodLivro: prod.CodLivro,
                            Nome: prod.Nome,
                            Autor: prod.Autor,
                            Editora: prod.Editora,
                            Ano: prod.Ano,
                            Preco: prod.Preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os livros',
                                url: 'http://localhost:3000/livro/' + prod.CodLivro
                            }
                        }
                    })
                }
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
            (error, result, field) => {
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
            (error, result, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: result});
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
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };

                res.status(202).send({
                    mensagem: 'Livro alterado com sucesso!'
                })
            }
        )
    });
});
//EXCLUI UM LIVRO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            `DELETE FROM Livro WHERE CodLivro = ?`, [req.body.CodProduto],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };

                res.status(202).send({
                    mensagem: 'Livro removido com sucesso!'
                })
            }
        )
    });
});

module.exports = router;