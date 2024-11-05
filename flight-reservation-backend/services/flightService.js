const soap = require('soap');
var parseString = require('xml2js').parseString;
var stripNS = require('xml2js').processors.stripPrefix;
const axios = require('axios');
const https = require('https');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const SOAP_SERVICE_URL = 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx?wsdl'

const getVuelo = async (origen, destino) => {
    try {
        const url = 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx';
        const client = await soap.createClientAsync(url);
        const [result] = await client.ObtenerVueloOrigenDestino({ origen, destino });        
        const { codigo, origen, destino, NumeroPasajero } = result;
        // TODO: confirmar si la libreria soap devuelve un json o  un xml. Si es xml deben extraer la información que necesiten
        // le dejo un ejemplo de request y response
        // REQUEST
        //<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        //     <soapenv:Header/>
        //     <soapenv:Body>
        //         <tem:ObtenerVueloOrigenDestino>
        //             <!--Optional:-->
        //             <tem:Origen>CUENCA</tem:Origen>
        //             <!--Optional:-->
        //             <tem:Destino>QUITO</tem:Destino>
        //         </tem:ObtenerVueloOrigenDestino>
        //     </soapenv:Body>
        //</soapenv:Envelope>
        
        // RESPONSE cuando SI existen vuelos con esa combinacion de origen - destino
        // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        //     <soap:Body>
        //         <ObtenerVueloOrigenDestinoResponse xmlns="http://tempuri.org/">
        //             <ObtenerVueloOrigenDestinoResult>
        //                 <Codigo>HAY-001</Codigo>
        //                 <Origen>CUENCA</Origen>
        //                 <Destino>MANTA</Destino>
        //                 <NumerpPasajero>51</NumerpPasajero>
        //                 <Estado>ACT</Estado>
        //             </ObtenerVueloOrigenDestinoResult>
        //         </ObtenerVueloOrigenDestinoResponse>
        //     </soap:Body>
        // </soap:Envelope>

        // RESPONSE cuando NO existen vuelos con esa combinacion de origen - destino... la respuesta es null 
        // Deben controlar para que lancen un 404 o devuelvan un undefined eso deben quedar de acuerdo con @David Clavijo)
        // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        //     <soap:Body>
        //         <ObtenerVueloOrigenDestinoResponse xmlns="http://tempuri.org/"/>
        //     </soap:Body>
        // </soap:Envelope>
        return { codigo, origen, destino, NumeroPasajero, estado };
    } catch (error) {
        throw new Error('Error al obtener el vuelo: ' + error.message);
    }
};

module.exports = { getVuelo };
