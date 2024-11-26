const { mySQLdb } = require('../../config/mysql');

const deleteDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const deleteDoctorSQL = 'DELETE FROM doctors_profile WHERE doctor_id = ?';
  const deleteSpecialitySQL = 'DELETE FROM doctor_speciality WHERE doctor_id = ?';

  try {
    const [deleteSpecialityResult] = await mySQLdb.query(deleteSpecialitySQL, [doctorId]);
    const [deleteDoctorResult] = await mySQLdb.query(deleteDoctorSQL, [doctorId]);

    if (deleteDoctorResult.affectedRows > 0 || deleteSpecialityResult.affectedRows > 0) {
      res.send({ message: 'Doctor deleted successfully' });
    } else {
      res.status(404).send({ message: 'Doctor not found' });
    }
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).send({ error: 'Database error' });
  }
};

module.exports = deleteDoctor;
