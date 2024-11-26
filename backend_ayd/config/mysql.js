const mysql = require('mysql2/promise');

const mySQLdb = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbms_project',
});

async function connectMySQL() {
    try {
        await mySQLdb.getConnection();
        console.log('MySQL Connected...');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
}

module.exports = { mySQLdb, connectMySQL };
