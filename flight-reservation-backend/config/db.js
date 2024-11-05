const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://admin:password@localhost:27017/flight-reservations?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error conectando a MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;