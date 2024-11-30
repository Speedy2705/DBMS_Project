const { mySQLdb } = require("../../config/mysql");

async function allstudentdetails(req, res) {
    const studentSQL = `SELECT * FROM students`;

    try {
        const [students] = await mySQLdb.query(studentSQL);
        res.json(students);
    } catch (err) {
        console.error('Error in allstudentdetails:', err);
        res.status(500).send('Server error');
    }
}

module.exports = allstudentdetails;