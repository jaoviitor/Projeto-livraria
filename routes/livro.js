const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA OS LIVROS CADASTRADOS
router.get('/', (req, res, next) => {
    //res.status(200).send({
    //    mensagem: 'Retorna todas as solicitações'
    //});

    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Livro;',
            (error, resultado, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
    
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
router.get('/:CodEmpresa', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Empresa WHERE CodEmpresa = ?;',
            [req.params.CodEmpresa],
            (error, resultado, fields) =>{
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});
//ALTERA UM LIVRO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de solicitacao'
    });
});
//EXCLUI UM LIVRO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de solicitacao'
    });
});

module.exports = router;