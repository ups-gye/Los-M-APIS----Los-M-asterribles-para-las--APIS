const { getClienteByCedula } = require('../services/clientService');
const { getVuelo } = require('../services/flightService');
const {
    obtenerReservas,
    obtenerNumeroReservasActivas,
    guardarReserva,
    modificarReserva,
} = require('../services/reservationService');

const resolvers = {
    Query: {
        getClienteByCedula: async (_, { cedula }) => {
            return await getClienteByCedula(cedula);
        },
        getVuelo: async (_, { origen, destino }) => {
            return await getVuelo({ origen, destino});
        },
        obtenerReservas: async (_, args) => {
            return await obtenerReservas(args); // Si args esta vacio, obtendra todas las reservas
        },
    },
    Mutation: {
        guardarReserva: async (_, { codigoVuelo, fecha, cedula, estadoReserva, clase }) => {
            // Verificar numero de reservas activas para el vuelo y fecha
            const numeroReservasActivas = await obtenerNumeroReservasActivas({ codigoVuelo, fecha});
            const asientosDisponibles = 136 - numeroReservasActivas;
            if (asientosDisponibles < 1) {
                throw new Error('No hay asientos disponibles para este vuelo en la fecha seleccionada.');
            }

            // Guardar la resevra
            return await guardarReserva({ codigoVuelo, fecha, cedula, estadoReserva, clase });
        },
        modificarReserva: async (_, { id, codigoVuelo, fecha, estadoReserva, clase }) => {
            return await modificarReserva({ id, codigoVuelo, fecha, estadoReserva, clase });
        },
    },
};

module.exports = resolvers;
