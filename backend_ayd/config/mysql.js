const mysql = require('mysql2');

const mySQLdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbms_project'
});

function connectMySQL() {
    return new Promise((resolve, reject) => {
        mySQLdb.connect(err => {
            if (err) {
                reject(err);
            } else {
                console.log('MySQL Connected...');
                resolve();
            }
        });
    });
}

module.exports = { mySQLdb, connectMySQL };
