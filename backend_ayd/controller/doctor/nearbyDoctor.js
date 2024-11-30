const { mySQLdb } = require("../../config/mysql");

const getDoctorsByPincodeAndSpecialty = async (req, res) => {
  const { pincode, specialty } = req.query;
  
  try {
    const sql = `
      SELECT dp.*, ds.body_part 
      FROM doctors_profile dp
      INNER JOIN doctor_speciality ds ON dp.doctor_id = ds.doctor_id
      WHERE dp.pincode = ? AND ds.body_part = ?
    `;
    const [doctors] = await mySQLdb.query(sql, [pincode, specialty]);
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Server error');
  }
};

module.exports = getDoctorsByPincodeAndSpecialty;
