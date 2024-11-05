const axios = require('axios');

const getClienteByCedula = async (cedula) => {
    try{
        const response = await axios.get(`api/clients/${cedula}`);
        const { cedula, nombre, apellido, fechaNacimiento, sexo } = response.data;
        return { cedula, nombre, apellido, fechaNacimiento, sexo };
    } catch (error) {
        throw new Error('Error al obtener el cliente: ' + error.message);
    }
};

module.exports = { getClienteByCedula };