const mysql = require('mysql2/promise');

const mySQLdb = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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
