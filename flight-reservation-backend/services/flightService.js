var axios = require('axios')
var parseString = require('xml2js').parseString;
var stripNS = require('xml2js').processors.stripPrefix;

const url = 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx?wsdl';

const callSoapService = async (operacion, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': operacion,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en la llamada SOAP:', error);
        throw error;
    }
};

const buildRequest = (origen, destino) => {
    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
            <soapenv:Header/>
            <soapenv:Body>
                <tem:ObtenerVueloOrigenDestino>
                    <tem:Origen>${origen}</tem:Origen>
                    <tem:Destino>${destino}</tem:Destino>
                </tem:ObtenerVueloOrigenDestino>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
    return soapBody;
}

const getVuelo = async (origen, destino) => {
    try {
        const soapBody = buildRequest(origen, destino);
        const soapResponse = await callSoapService('http://tempuri.org/ObtenerVueloOrigenDestino', soapBody);
        let jsonResponse = await parseXmlResponse(soapResponse);
        jsonResponse = 
            jsonResponse.Envelope.Body.ObtenerVueloOrigenDestinoResponse.ObtenerVueloOrigenDestinoResult ? 
                jsonResponse.Envelope.Body.ObtenerVueloOrigenDestinoResponse.ObtenerVueloOrigenDestinoResult : {}        
        return {
            codigo: jsonResponse.Codigo, 
            origen: jsonResponse.Origen,
            destino: jsonResponse.Destino, 
            numeroAsientosTotales: jsonResponse.NumerpPasajero
        };
    } catch (error) {
        throw new Error('Error al obtener el vuelo: ' + error.message);
    }
};

const removeHyphens = (name) =>{
    return name.replace(/-/g, '');
}
const parseXmlResponse = async(soapResponse)=>{
    return await new Promise((resolve, reject) => {
        parseString(soapResponse, {tagNameProcessors: [stripNS, removeHyphens],explicitArray:false}, function (error, result) {
            console.dir(result);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });

};

module.exports = { getVuelo };