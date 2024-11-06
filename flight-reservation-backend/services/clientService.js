const axios = require('axios');

const getClienteByCedula = async (cedula) => {        
    try{        
        const url = `http://192.168.26.13:8080/v1/client/getByDni?dni=${cedula}`                
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