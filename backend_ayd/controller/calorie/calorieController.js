const Calorie = require('../../models/calorieModel'); // Import the calorie model

// Create a new calorie record
const addCalorieRecord = async (req, res) => {
    try {
        const { email, caloriecount, date } = req.body;

        // Check if a record for this date and email already exists
        const existingRecord = await Calorie.findOne({ email, date,caloriecount });
        if (existingRecord) {
            return res.status(400).json({ message: 'Record already exists for this date and email' });
        }

        const newRecord = new Calorie({
            email,
            caloriecount,
            date,
        });

        await newRecord.save();
        res.status(201).json({newRecord,success:true});
    } catch (error) {
        res.status(500).json({ message: 'Error adding calorie record', error });
    }
};

// Get all calorie records for a specific email
const getCalorieRecords = async (req, res) => {
    try {
        const { email } = req.params;
        const records = await Calorie.find({ email });

        if (records.length === 0) {
            return res.status(404).json({ message: 'No records found for this email' });
        }

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving records', error });
    }
};

// Update a calorie record by date and email
const updateCalorieRecord = async (req, res) => {
    try {
        const { email, date } = req.params;
        const { caloriecount } = req.body;

        const updatedRecord = await Calorie.findOneAndUpdate(
            { email, date },
            { caloriecount },
            { new: true }
        );

        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found for this date and email' });
        }

        res.json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: 'Error updating calorie record', error });
    }
};

// Delete a calorie record by date and email
const deleteCalorieRecord = async (req, res) => {
    try {
        const { email, date } = req.params;

        const deletedRecord = await Calorie.findOneAndDelete({ email, date });

        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found for this date and email' });
        }

        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting calorie record', error });
    }
};

module.exports = {
    addCalorieRecord,
    getCalorieRecords,
    updateCalorieRecord,
    deleteCalorieRecord,
};
