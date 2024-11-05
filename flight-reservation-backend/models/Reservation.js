const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    codigoVuelo: { type: String, required: true },
    fecha: { type: Date, required: true },
    cedula: { type: String, required: true },
    estadoReserva: { type: String, enum: ['ACT', 'ANU'], required: true },
    clase: { type: String, enum: ['ECONÓMICA', 'PREMIUM', 'BÁSICA'], required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;