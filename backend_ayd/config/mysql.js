const mysql = require('mysql2');

async function connectMySQL () {
    try{
        await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbms_project'
        });
    }catch(err) {
        console.log(err)
    }
}

module.exports = connectMySQL
