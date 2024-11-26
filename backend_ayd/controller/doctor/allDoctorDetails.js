const { mySQLdb } = require('../../config/mysql');

async function allDoctorDetails(req, res) {
  const doctorsSQL = `
    SELECT d.doctor_id, d.full_name, d.distance, d.image, d.address, d.contact, d.pincode, s.body_part AS speciality
    FROM doctors_profile d
    LEFT JOIN doctor_speciality s ON d.doctor_id = s.doctor_id
  `;

  try {
    const [doctors] = await mySQLdb.query(doctorsSQL);
    res.json(doctors);
  } catch (err) {
    console.error('Error in allDoctorDetails:', err);
    res.status(500).send('Server error');
  }
}

module.exports = allDoctorDetails;
