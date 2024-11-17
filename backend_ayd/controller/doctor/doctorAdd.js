const { mySQLdb } = require("../../config/mysql");


function generateDoctorId(callback) {
    const sql = 'SELECT MAX(doctor_id) AS max_id FROM doctors_profile';
    mySQLdb.query(sql, (err, result) => {
        if (err) {
            return callback(err);
        }
        const maxId = result[0].max_id || 0;
        const newId = (maxId + 1).toString().padStart(4, '0');
        callback(null, newId);
    });
}

function doctorAddController(req, res) {
    generateDoctorId((err, newDoctorId) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        const { full_name, distance, image, address, contact, pincode, speciality } = req.body;
        const doctorProfileSQL = 'INSERT INTO doctors_profile (doctor_id, full_name, distance, image, address, contact, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const doctorSpecialitySQL = 'INSERT INTO doctors_speciality (doctor_id, body_part) VALUES (?, ?)';
        const doctorValues = [newDoctorId, full_name, distance, image, address, contact, pincode];
        const specialityValues = [newDoctorId, speciality];

        mySQLdb.query(doctorProfileSQL, doctorValues, (err, result) => {
            if (err) {
                return res.status(500).send('Server error');
            }

            mySQLdb.query(doctorSpecialitySQL, specialityValues, (err, result) => {
                if (err) {
                    return res.status(500).send('Server error');
                }
                res.send('Doctor and speciality added successfully');
            });
        });
    });
}

module.exports = doctorAddController;
