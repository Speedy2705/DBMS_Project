const mongoose = require('mongoose');

const calorieSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique:false
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format',
        },
        unique:false
    },
    caloriecount: {
        type: Number,
        required: true,
        unique:false
    }
    
});



const calorieModel = mongoose.model("calorie", calorieSchema)

module.exports = calorieModel