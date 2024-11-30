const { mySQLdb } = require('../../config/mysql');

const getDoctorsByPincodeAndBodyPart = async (req, res) => {
  const { pincode, bodyPart } = req.query;
  
  try {
    const sql = `
      SELECT dp.*, ds.body_part, s.specialist 
      FROM doctors_profile dp
      INNER JOIN doctor_speciality ds ON dp.doctor_id = ds.doctor_id
      INNER JOIN speciality s ON ds.body_part = s.body_part
      WHERE dp.pincode = ? AND ds.body_part = ?
    `;
    const [doctors] = await mySQLdb.query(sql, [pincode, bodyPart]);
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { getDoctorsByPincodeAndBodyPart };
