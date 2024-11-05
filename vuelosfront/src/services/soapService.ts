

import axios from 'axios';
import { Vuelo } from './types';

const url = '/api?wsdl';

const callSoapService = async (action: string, body: string) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': action,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error en la llamada SOAP:', error);
        throw error;
    }
};

export const crearVuelo = async (vueloData: Vuelo) => {
    const soapBody = `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <CrearVuelo xmlns="http://tempuri.org/">
                    <vueloData>
                        <Codigo>${vueloData.codigo}</Codigo>
                        <Origen>${vueloData.origen}</Origen>
                        <Destino>${vueloData.destino}</Destino>
                        <NumeroPasajero>${vueloData.numeroPasajeros}</NumeroPasajero>
                        <Estado>${vueloData.estado || ''}</Estado>
                    </vueloData>
                </CrearVuelo>
            </soap:Body>
        </soap:Envelope>
    `;
    return callSoapService('http://tempuri.org/CrearVuelo', soapBody);
};

export const modificarVuelo = async (vueloData: Vuelo) => {
    const soapBody = `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ModificarVuelo xmlns="http://tempuri.org/">
                    <vueloData>
                        <Codigo>${vueloData.codigo}</Codigo>
                        <Origen>${vueloData.origen}</Origen>
                        <Destino>${vueloData.destino}</Destino>
                        <NumerpPasajero>${vueloData.numeroPasajeros}</NumerpPasajero>
                        <Estado>${vueloData.estado || ''}</Estado>
                    </vueloData>
                </ModificarVuelo>
            </soap:Body>
        </soap:Envelope>
    `;
    return callSoapService('http://tempuri.org/ModificarVuelo', soapBody);
};

export const obtenerVuelos = async () => {
    const soapBody = `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ObtenerVuelos xmlns="http://tempuri.org/"/>
            </soap:Body>
        </soap:Envelope>
    `;
    return callSoapService('http://tempuri.org/ObtenerVuelos', soapBody);
};

export const obtenerVueloOrigenDestino = async (origen: string, destino: string) => {
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
    return callSoapService('http://tempuri.org/ObtenerVueloOrigenDestino', soapBody);
};
