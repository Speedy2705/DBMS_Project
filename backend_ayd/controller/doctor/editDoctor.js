const { mySQLdb } = require('../../config/mysql');

const getDoctorDetails = async (req, res) => {
  const { doctorId } = req.params;
  const getDoctorSQL = `
    SELECT d.doctor_id, d.full_name, d.distance, d.image, d.address, d.contact, d.pincode, s.body_part AS speciality
    FROM doctors_profile d
    LEFT JOIN doctor_speciality s ON d.doctor_id = s.doctor_id
    WHERE d.doctor_id = ?
  `;

  try {
    const [doctor] = await mySQLdb.query(getDoctorSQL, [doctorId]);
    if (doctor.length > 0) {
      res.send(doctor[0]);
    } else {
      res.status(404).send({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error('Error fetching doctor details:', err);
    res.status(500).send({ error: 'Database error' });
  }
};

const editDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { full_name, distance, image, address, contact, pincode, speciality } = req.body;
  const updateDoctorSQL = `
    UPDATE doctors_profile 
    SET full_name = ?, distance = ?, image = ?, address = ?, contact = ?, pincode = ?
    WHERE doctor_id = ?
  `;
  const updateSpecialitySQL = `
    UPDATE doctor_speciality 
    SET body_part = ?
    WHERE doctor_id = ?
  `;

  try {
    const [updateDoctorResult] = await mySQLdb.query(updateDoctorSQL, [full_name, distance, image, address, contact, pincode, doctorId]);
    const [updateSpecialityResult] = await mySQLdb.query(updateSpecialitySQL, [speciality, doctorId]);

    if (updateDoctorResult.affectedRows > 0 || updateSpecialityResult.affectedRows > 0) {
      res.send({ message: 'Doctor details updated successfully',success:true });
    } else {
      res.status(404).send({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).send({ error: 'Database error' });
  }
};

module.exports = { getDoctorDetails, editDoctor };
