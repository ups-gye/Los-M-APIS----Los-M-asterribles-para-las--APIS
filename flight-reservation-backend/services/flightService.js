const soap = require('soap');

const getVuelo = async (origen, destino) => {
    try {
        const url = 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx';
        const client = await soap.createClientAsync(url);
        const [result] = await client.ObtenerVueloOrigenDestino({ origen, destino });
        const { codigo, origen, destino, numeroAsientosTotales } = result;
        return { codigo, origen, destino, numeroAsientosTotales };
    } catch (error) {
        throw new Error('Error al obtener el vuelo: ' + error.message);
    }
};

module.exports = { getVuelo };