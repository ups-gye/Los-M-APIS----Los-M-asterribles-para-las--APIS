const axios = require('axios');

const getClienteByCedula = async (cedula) => {
    try{
        const response = await axios.get(`http://185.209.230.19:8080/${cedula}`);
        const { cedula, nombre, apellido, fechaNacimiento, sexo } = response.data;
        return { cedula, nombre, apellido, fechaNacimiento, sexo };
    } catch (error) {
        throw new Error('Error al obtener el cliente: ' + error.message);
    }
};

module.exports = { getClienteByCedula };