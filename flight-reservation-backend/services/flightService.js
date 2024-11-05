const soap = require('soap');
var parseString = require('xml2js').parseString;
var stripNS = require('xml2js').processors.stripPrefix;
const axios = require('axios');
const https = require('https');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const SOAP_SERVICE_URL = 'https://pdim.edg-ec.com/Vuelos/VueloSoap.asmx?wsdl'


const prepareInputXML = async (vin, logger) => {
    let messageId = uuidv4();
    let creationDate = moment.utc().tz("America/Chicago").format();
    let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dev="http://www.atxg.com/schemas/t3/ts/devicemgmtsvc" xmlns:mes="http://www.atxg.com/schemas/t3/messaging" xmlns:add="http://schemas.xmlsoap.org/ws/2004/08/addressing"><soapenv:Header/><soapenv:Body><ns3:get-basic-device-info-request-message type="ns3:DeviceMgmtSvc" xmlns="http://www.atxg.com/schemas/t3/messaging" xmlns:ns6="http://www.atxg.com/schemas/t3/telephony" xmlns:ns5="http://www.atxg.com/schemas/t3/services" xmlns:ns7="http://www.atxg.com/schemas/t3/accounting" xmlns:ns2="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:ns4="http://www.atxg.com/schemas/t3/common" xmlns:ns3="http://www.atxg.com/schemas/t3/ts/devicemgmtsvc"><message-header><msg-info><service>DeviceMgmtSvc</service><action>GetBasicDeviceInfo</action><session-id>fc650997-457d-4617-a8d2-7992b545e762</session-id><msg-id>${messageId}</msg-id><time-of-creation>${creationDate}</time-of-creation></msg-info><conv-info><to>DeviceMgmtSvc</to><from><ns2:Address>TS</ns2:Address></from><source-system>T3_TS_TS</source-system><require-notification>false</require-notification><message-delivery-method>WEB_SERVICE</message-delivery-method></conv-info></message-header><ns3:get-basic-device-info-request-criteria-message-body><ns3:criteria><ns4:key>VIN</ns4:key><ns4:relation>EQUAL</ns4:relation><ns4:value>${vin}</ns4:value></ns3:criteria></ns3:get-basic-device-info-request-criteria-message-body></ns3:get-basic-device-info-request-message></soapenv:Body></soapenv:Envelope>`;
    await logger.info("xml: " + xml);
    return xml;
};

const getBasicDeviceInfoSoap = async (vin, logger) => {
    let xmls = await prepareInputXML(vin, logger);
    let basicDeviceInfoResponse;
    try {
        const res = await axios.post(SOAP_SERVICE_URL, xmls, {
            headers: { 'Content-Type': 'text/xml' },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        basicDeviceInfoResponse = res.data;
        await logger.info("basicDeviceInfoResponse: " + basicDeviceInfoResponse);
    } catch (error) {
        await logger.error(new Error("Error while getting deviceInfo" + error.stack));
        await logger.info("Setting response empty...");
        basicDeviceInfoResponse = "";
    }
    await logger.info("basicDeviceInfoResponse after soap call: " + JSON.stringify(basicDeviceInfoResponse));
    return { key: 'serviceDetailsFromT3', value: basicDeviceInfoResponse };
};

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

const removeHyphens = (name) =>{
    return name.replace(/-/g, '');
}
const parseXmlResponse = async(serviceDetailsFromT3,logger)=>{
    return await new Promise((resolve, reject) => {
        parseString(serviceDetailsFromT3, {tagNameProcessors: [stripNS, removeHyphens], explicitArray:false}, function (error, result) {
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

module.exports = { getVuelo, getBasicDeviceInfoSoap };