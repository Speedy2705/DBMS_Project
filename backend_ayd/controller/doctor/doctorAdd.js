const { mySQLdb } = require("../../config/mysql");

async function generateDoctorId() {
    const sql = 'SELECT MAX(doctor_id) AS max_id FROM doctors_profile';
    try {
        const [result] = await mySQLdb.promise().query(sql);
        const maxId = result[0]?.max_id || 0;
        return (maxId + 1).toString().padStart(4, '0');
    } catch (err) {
        throw new Error('Error generating doctor ID: ' + err.message);
    }
}

async function doctorAddController(req, res) {
    try {
        const newDoctorId = await generateDoctorId();
        const { full_name, distance, image, address, contact, pincode, speciality } = req.body;
        const doctorProfileSQL = 'INSERT INTO doctors_profile (doctor_id, full_name, distance, image, address, contact, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const doctorSpecialitySQL = 'INSERT INTO doctor_speciality (doctor_id, body_part) VALUES (?, ?)';
        const doctorValues = [newDoctorId, full_name, distance, image, address, contact, pincode];
        const specialityValues = [newDoctorId, speciality];

        await mySQLdb.promise().query(doctorProfileSQL, doctorValues);
        await mySQLdb.promise().query(doctorSpecialitySQL, specialityValues);

        res.json({ message: 'Doctor and speciality added successfully' });
    } catch (err) {
        console.error('Error in doctorAddController:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = doctorAddController;
