const mysql = require('mysql2');

var pool = mysql.createPool({
    "user": "root",
    "password": "jv5712",
    "database": "Livraria",
    "host": "localhost",
    "port": 3306
})

exports.pool = pool;