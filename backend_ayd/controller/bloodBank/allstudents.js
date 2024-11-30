const { mySQLdb } = require("../../config/mysql");

async function allstudentdetails(req, res) {
    const studentSQL = `SELECT * FROM student inner join contact on student.roll_number=contact.roll_number`;

    try {
        const [students] = await mySQLdb.query(studentSQL);
        res.json(students);
    } catch (err) {
        console.error('Error in allstudentdetails:', err);
        res.status(500).send('Server error');
    }
}

module.exports = allstudentdetails;