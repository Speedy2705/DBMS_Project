const mongoose = require('mongoose');

const calorieSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique:true
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

    }
    
});



const calorieModel = mongoose.model("calorie", calorieSchema)

module.exports = calorieModel