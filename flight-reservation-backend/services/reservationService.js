const Reservation = require('../models/Reservation');

const obtenerReservas = async ({ codigoVuelo, fecha } = {}) => {
    const query = {};
    if (codigoVuelo) query.codigoVuelo = codigoVuelo;
    if (fecha) query.fecha = new Date(fecha);
    const reservas = await Reservation.find(query);
    return reservas;
};

const obtenerNumeroReservasActivas = async ({ codigoVuelo, fecha }) => {
    const count = await Reservation.countDocuments({
        codigoVuelo,
        fecha: new Date(fecha),
        estadoReserva: 'ACT',
    });
    return count;
};

const guardarReserva = async ({ codigoVuelo, fecha, cedula, estadoReserva, clase }) => {
    const nuevaReserva = new Reservation({
        codigoVuelo,
        fecha: new Date(fecha),
        cedula,
        estadoReserva,
        clase,
    });
    return await nuevaReserva.save();
};

const modificarReserva = async ({ id, codigoVuelo, fecha, estadoReserva, clase }) => {
    const actualizacion = {};
    if (codigoVuelo) actualizacion.codigoVuelo = codigoVuelo;
    if (fecha) actualizacion.fecha = new Date(fecha);
    if (estadoReserva) actualizacion.estadoReserva = estadoReserva;
    if (clase) actualizacion.clase = clase;

    const reservaActualizada = await Reservation.findByIdAndUpdate(id, actualizacion, { new: true });
    return reservaActualizada;
};

module.exports = {
    obtenerReservas,
    obtenerNumeroReservasActivas,
    guardarReserva,
    modificarReserva,
};