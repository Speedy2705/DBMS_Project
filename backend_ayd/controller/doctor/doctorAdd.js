const connectMySQL = require('../../config/mysql');

function generateDoctorId(callback) {
    const sql = 'SELECT MAX(doctor_id) AS max_id FROM doctor';
    connectMySQL.query(sql, (err, result) => {
        if (err) {
            return callback(err);
        }
        const maxId = result[0].max_id || 0;
        const newId = (maxId + 1).toString().padStart(4, '0');
        callback(null, newId);
    });
}

function doctorAddController(req, res){
    generateDoctorId((err, newDoctorId) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        const { full_name, distance, image, address, contact, pincode } = req.body;
        const sql = 'INSERT INTO doctors_profile (doctor_id, full_name, distance, image, address, contact, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const sql_connect = 'INSERT INTO doctors_speciality (doctor_id, body_part)';
        const values1 = [newDoctorId, full_name, distance, image, address, contact, pincode];
        const values2 = [newDoctorId, speciality];

        connectMySQL.query(sql, values1, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.send('Doctor added successfully');
        });
        connectMySQL.query(sql_connect, values2, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.send('Speciality also added successfully');
        });
    });
};

module.exports = doctorAddController
