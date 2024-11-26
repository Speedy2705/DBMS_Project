const { mySQLdb } = require('../../config/mysql');

const editBodyPartDetails = async (req, res) => {
  const { position, cut, pain, swell } = req.body;
  const sql = 'UPDATE human_body SET cut = ?, pain = ?, swell = ? WHERE body_part = ?';

  try {
    const [result] = await mySQLdb.query(sql, [cut, pain, swell, position]);
    if (result.affectedRows > 0) {
      res.send({ message: 'Record updated', result });
    } else {
      res.status(404).send({ message: 'Body part not found' });
    }
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send({ error: 'Database error' });
  }
};

const getBodyPartDetails = async (req, res) => {
  const { bodyPart } = req.params;
  const sql = 'SELECT * FROM human_body WHERE body_part = ?';

  try {
    const [result] = await mySQLdb.query(sql, [bodyPart]);
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ message: 'Body part not found' });
    }
  } catch (err) {
    console.error('Error fetching record:', err);
    res.status(500).send({ error: 'Database error' });
  }
};

module.exports = { editBodyPartDetails, getBodyPartDetails };
