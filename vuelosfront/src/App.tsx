import React, { useState } from 'react';
import { crearVuelo, modificarVuelo, obtenerVuelos, obtenerVueloOrigenDestino } from './services/soapService';
import { Vuelo } from './services/types';
import './index.css';

const App: React.FC = () => {
    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const [vueloData, setVueloData] = useState<Vuelo>({
        codigo: '',
        origen: '',
        destino: '',
        numeroPasajeros: 0,
        estado: ''
    });
    const [vueloEncontrado, setVueloEncontrado] = useState<Vuelo | null>(null);
    const [origenBuscar, setOrigenBuscar] = useState('');
    const [destinoBuscar, setDestinoBuscar] = useState('');

    const handleCrearVuelo = async () => {
        try {
            const response = await crearVuelo(vueloData);
            console.log('Vuelo creado:', response);
            alert('Vuelo creado con éxito');
        } catch (error) {
            console.error('Error al crear vuelo:', error);
            alert('Error al crear vuelo');
        }
    };

    const handleModificarVuelo = async () => {
        try {
            const response = await modificarVuelo(vueloData);
            console.log('Vuelo modificado:', response);
            alert('Vuelo modificado con éxito');
        } catch (error) {
            console.error('Error al modificar vuelo:', error);
            alert('Error al modificar vuelo');
        }
    };

    const handleObtenerVuelos = async () => {
        try {
            const response = await obtenerVuelos();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/xml");
            const vuelosData = xmlDoc.getElementsByTagName("VueloData");
            const vuelosObtenidos = Array.from(vuelosData).map(item => ({
                codigo: item.getElementsByTagName("Codigo")[0]?.textContent || '',
                origen: item.getElementsByTagName("Origen")[0]?.textContent || '',
                destino: item.getElementsByTagName("Destino")[0]?.textContent || '',
                numeroPasajeros: parseInt(item.getElementsByTagName("NumerpPasajero")[0]?.textContent || '0', 10),
                estado: item.getElementsByTagName("Estado")[0]?.textContent || ''
            }));
    
            setVuelos(vuelosObtenidos);
        } catch (error) {
            console.error('Error al obtener vuelos:', error);
            alert('Error al obtener vuelos');
        }
    };

    const handleBuscarVuelo = async () => {
        try {
            const response = await obtenerVueloOrigenDestino(origenBuscar, destinoBuscar);
            console.log('Respuesta del servicio de búsqueda:', response);
    
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/xml");
            const vueloDataMatch = xmlDoc.getElementsByTagName("ObtenerVueloOrigenDestinoResult");
    
            if (vueloDataMatch.length > 0) {
                const vuelo = {
                    codigo: vueloDataMatch[0].getElementsByTagName("Codigo")[0]?.textContent || '',
                    origen: vueloDataMatch[0].getElementsByTagName("Origen")[0]?.textContent || '',
                    destino: vueloDataMatch[0].getElementsByTagName("Destino")[0]?.textContent || '',
                    numeroPasajeros: parseInt(vueloDataMatch[0].getElementsByTagName("NumerpPasajero")[0]?.textContent || '0', 10),
                    estado: vueloDataMatch[0].getElementsByTagName("Estado")[0]?.textContent || '',
                };
    
                // Mostrar el vuelo encontrado en los campos de creación de vuelo
                setVueloData(vuelo); // Asegúrate de que `setVueloData` actualice los campos de entrada.
                alert('Vuelo encontrado'); // O cualquier otro manejo que desees hacer
            } else {
                alert('Vuelo no encontrado');
                setVueloEncontrado(null);
            }
        } catch (error) {
            console.error('Error al buscar vuelo:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Gestor de Vuelos</h1>
            <div className="formContainer">
                <h2>Crear/Modificar Vuelo</h2>
                <label>Código</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Código"
                    value={vueloData.codigo}
                    onChange={(e) => setVueloData({ ...vueloData, codigo: e.target.value })}
                />
                <label>Origen</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Origen"
                    value={vueloData.origen}
                    onChange={(e) => setVueloData({ ...vueloData, origen: e.target.value })}
                />
                <label>Destino</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Destino"
                    value={vueloData.destino}
                    onChange={(e) => setVueloData({ ...vueloData, destino: e.target.value })}
                />
                <label>Número de Pasajeros</label>
                <input
                    className="input"
                    type="number"
                    placeholder="Número de Pasajeros"
                    value={vueloData.numeroPasajeros}
                    onChange={(e) => setVueloData({ ...vueloData, numeroPasajeros: +e.target.value })}
                />
                <label>Estado</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Estado"
                    value={vueloData.estado}
                    onChange={(e) => setVueloData({ ...vueloData, estado: e.target.value })}
                />
                <div className="buttonContainer">
                    <button className="button" onClick={handleCrearVuelo}>Crear Vuelo</button>
                    <button className="button" onClick={handleModificarVuelo}>Modificar Vuelo</button>
                </div>
            </div>
            <div className="formContainer">
                <h2>Buscar Vuelo por Origen y Destino</h2>
                <label>Origen</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Origen"
                    value={origenBuscar}
                    onChange={(e) => setOrigenBuscar(e.target.value)}
                />
                <label>Destino</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Destino"
                    value={destinoBuscar}
                    onChange={(e) => setDestinoBuscar(e.target.value)}
                />
                <button className="button" onClick={handleBuscarVuelo}>Buscar Vuelo</button>
            </div>
            <div className="vuelosContainer">
                <h2>Obtener Vuelos</h2>
                <div className="buttonContainer">
                    <button className="button" onClick={handleObtenerVuelos}>Obtener Todos los Vuelos</button>
                </div>
                {vuelos.length > 0 && (
                    <table className="vuelosTable">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Número de Pasajeros</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vuelos.map((vuelo, index) => (
                                <tr key={index}>
                                    <td>{vuelo.codigo}</td>
                                    <td>{vuelo.origen}</td>
                                    <td>{vuelo.destino}</td>
                                    <td>{vuelo.numeroPasajeros}</td>
                                    <td>{vuelo.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {vueloEncontrado && (
                    <div className="vueloEncontrado">
                        <h3>Vuelo Encontrado:</h3>
                        <p><strong>Código:</strong> {vueloEncontrado.codigo}</p>
                        <p><strong>Origen:</strong> {vueloEncontrado.origen}</p>
                        <p><strong>Destino:</strong> {vueloEncontrado.destino}</p>
                        <p><strong>Número de Pasajeros:</strong> {vueloEncontrado.numeroPasajeros}</p>
                        <p><strong>Estado:</strong> {vueloEncontrado.estado}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

