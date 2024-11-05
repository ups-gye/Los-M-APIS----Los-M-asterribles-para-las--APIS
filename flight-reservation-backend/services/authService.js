const axios = require('axios');

const authenticateUser = async (email, password) => {
    try{
        const response = await axios.post('api/auth/login', {
            email,
            password
        });

        // Verificamos que la autenticacion sea exitosa
        if (response.data && response.data.token) {
            // Retorna el token JWT que sera utilizado para las futuras solicitudes
            return response.data.token;
        } else {
            throw new Error('Autenticacion fallida, no se recibio token');
        }
    } catch (error) {
        throw new Error('Error en la autenticacion: ' + error.message);
    }
};

module.exports = { authenticateUser };