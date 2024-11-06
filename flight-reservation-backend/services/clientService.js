const axios = require('axios');

const getClienteByCedula = async (cedula) => {        
    try{        
        const url = `http://185.209.230.19:8080/v1/client/getByDni?dni=${cedula}`                
        const response = await axios.get(url);        
        const { dni, name, lastName, birthDate, gender } = response.data;
        return { 
            cedula: dni, 
            nombre: name, 
            apellido: lastName, 
            fechaNacimiento:birthDate, 
            sexo: gender };
    } catch (error) {
        throw new Error('Error al obtener el cliente: ' + error.message);
    }
};

module.exports = { getClienteByCedula };