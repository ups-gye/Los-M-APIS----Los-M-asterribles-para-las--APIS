import { Layout } from '@/components/Layout'
import * as Forms from '@radix-ui/react-form';
import { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { faEdit, faTrash, faFloppyDisk, faBan, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

interface FlightReservationData {
  cedula: string;
  nombre: string;
  genero: string;
  origen: string;
  destino: string;
  vuelo: string;
  asientos: number | string;
  fecha: string;
  clase: 'PREMIUM' | 'ECONÓMICA' | 'BÁSICA';
  id?: string;
}

const OBTENER_RESERVAS = gql`
  query ObtenerReservas {
    obtenerReservas {
      id
      codigoVuelo
      fecha
      cedula
      estadoReserva
      clase
    }
  }
`;

const GUARDAR_RESERVA_MUTATION = gql`
  mutation GuardarReserva(
    $codigoVuelo: String!
    $fecha: String!
    $cedula: String!
    $estadoReserva: String!
    $clase: String!
  ) {
    guardarReserva(
      codigoVuelo: $codigoVuelo
      fecha: $fecha
      cedula: $cedula
      estadoReserva: $estadoReserva
      clase: $clase
    ) {
      cedula
      clase
      codigoVuelo
      estadoReserva
      fecha
      id
    }
  }
`;

const MODIFICAR_RESERVA = gql`
  mutation modificarReserva(
    $id: ID!, 
    $codigoVuelo: String!, 
    $fecha: String!, 
    $estadoReserva: String!, 
    $clase: String!
  ) {
    modificarReserva(
      id: $id,
      codigoVuelo: $codigoVuelo,
      fecha: $fecha,
      estadoReserva: $estadoReserva,
      clase: $clase
    ) {
      cedula
      clase
      codigoVuelo
      estadoReserva
      fecha
    }
  }
`;

export const GET_CLIENTE_BY_CEDULA = gql`
  query GetClienteByCedula($cedula: String!) {
    getClienteByCedula(cedula: $cedula) {
      cedula
      nombre
      apellido
      sexo
      fechaNacimiento
    }
  }
`;

const GET_VUELO = gql`
  query GetVuelo($origen: String!, $destino: String!) {
    getVuelo(origen: $origen, destino: $destino) {
      codigo
      origen
      destino
      numeroAsientosTotales
    }
  }
`;

export function BookingPage() {

  const [reservas, setReservas] = useState<any[]>([]);

const [showForm, setShowForm] = useState<boolean>(false);
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [validClient, setValidClient] = useState<boolean>(false);

const alert = (icon:number, title:string, message:string)=>{
  let type: 'success' | 'error' | 'warning' | 'info' | 'question' = icon === 1 ? 'success' : 'error';
  Swal.fire({
    icon: type,
    title: title,
    html: message,
    confirmButtonText: 'Aceptar'
  });
}

const [getCliente, { data: clienteData, loading: clienteLoading, error: clienteError }] = useLazyQuery(GET_CLIENTE_BY_CEDULA);

const [getVuelo, { data: vueloData/* , loading: vueloLoading, error: vueloError */ }] = useLazyQuery(GET_VUELO);

if (clienteLoading) {
  const message ="Cargando información"
  alert(1, 'Cargando', message)
} 
if (clienteError) {
  const message ="No se encontro ningun cliente con esa cedula, por favor realice el registro del cliente antes de realizar la reserva"
  alert(2, 'Error', message)
} 

const { loading, error, data } = useQuery(OBTENER_RESERVAS, {
  onCompleted: (data) => {
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const reservasConFechas = data.obtenerReservas.map((reserva: FlightReservationData) => ({
      ...reserva,
      fecha: new Date(parseInt(reserva.fecha, 10)).toISOString().split('T')[0],
    }));

    console.log("Estas son las reservas", reservasConFechas);
    setReservas(reservasConFechas);  
  }
});

const handleFetchReservas = (cedula:string, e: React.FormEvent) => {
  e.preventDefault();
  if ( cedula && validClient) {
    getCliente({ variables: { cedula } });
  }
  setValidClient(false)
  
};

  const [formData, setFormData] = useState<FlightReservationData>({
    cedula: '',
    nombre: '',
    genero: '',
    origen: '',
    destino: '',
    vuelo: '',
    asientos: '',
    fecha: '',
    clase: 'BÁSICA',
    id: '',
  });
  const [guardarReserva] = useMutation(GUARDAR_RESERVA_MUTATION, {refetchQueries:[{query: OBTENER_RESERVAS}]});
  
  const [modificarReserva] = useMutation(MODIFICAR_RESERVA, {refetchQueries:[{query: OBTENER_RESERVAS}]});

  const [cedula, setCedula] = useState<string>('');
  const ciudades: string[] = [
     'Quito' ,
     'Guayaquil' ,
     'Cuenca' ,
     'Ambato' ,
     'Manta' ,
     'Loja' ,
     'Santo Domingo' ,
     'Machala' ,
     'Riobamba' ,
     'Tulcán' ,
  ];
  const handleCancel = ( )=>{
    setShowForm(false);
    setIsUpdate(false);
    clearForm()
  }


  const clearForm = ()=>{
    setFormData({
      cedula: '',
      nombre: '',
      origen: '',
      destino: '',
      vuelo: '',
      asientos: '',
      fecha: '',
      clase: 'BÁSICA',
      genero:''
    });
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    let result :any
    try {
      if (isUpdate) {
        console.log(formData)
         result = await modificarReserva({
          variables: {
            id: formData.id,
            codigoVuelo: formData.vuelo,
            fecha: formData.fecha,
            cedula: formData.cedula,
            estadoReserva: "ACT",
            clase: formData.clase
          }
        });
        
        setReservas(prevReservas => prevReservas.map(reserva =>
          reserva.id === formData.id ? result.data.modificarReserva : reserva
        ));

        setIsUpdate(false)
      }else{
          result = await guardarReserva({
          variables: {
            codigoVuelo: formData.vuelo,
            fecha: formData.fecha,
            cedula: formData.cedula,
            estadoReserva: 'ACT',
            clase: formData.clase,
          },
        });
        setReservas(prevReservas => [...prevReservas, result.data.guardarReserva]);
      }

      Swal.fire({
        icon: 'success',
        title: 'Reserva guardada',
        text: 'Tu reserva ha sido guardada correctamente.',
        confirmButtonText: 'Aceptar'
      });
      
      console.log('Reserva guardada', result.data);
      
      clearForm()
      setShowForm(false);

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar tu reserva. Intenta nuevamente.',
        confirmButtonText: 'Aceptar'
      });
      console.error('Error al guardar la reserva:', err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Campo: ${name}, Valor: ${value}`); 

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleEdit = (obj: FlightReservationData) => {
    setFormData({
      cedula: obj.cedula,
      nombre: '',
      origen: '',
      destino: '',
      vuelo: '',
      asientos: '',
      fecha: obj.fecha,
      clase: obj.clase,
      id: obj.id,
      genero:''
    });

    console.log('Editar reserva con ID:', formData);
    console.log('ID:', obj.id);
    setShowForm(true);
    setIsUpdate(true);

  };

  const handleDelete = async (obj: FlightReservationData) => {
    console.log(obj)
    
    await modificarReserva({
      variables: {
        id: obj.id,
        codigoVuelo: obj.codigoVuelo,
        fecha: obj.fecha,
        cedula: obj.cedula,
        estadoReserva: "ANU",
        clase: obj.clase
      }
    });
    /* setReservas(reservas.filter(reserva => reserva.id !== obj.id)); */
  };

  const handleGenerateNewReservation = () => {
    setShowForm(true);
    clearForm()
    setValidClient(true)

  };
  
  useEffect(() => {
    if (!!formData.cedula) {
      setCedula(formData.cedula)
    }
    console.log('Editar reserva con IDs:', cedula);
  }, [formData]);

  useEffect(() => {
    if ( !!formData.origen && !!formData.destino) {
      const origen:string=formData.origen
      const destino:string=formData.destino
      getVuelo({ variables: { origen ,destino } });
    }
  }, [formData]);

  useEffect(() => {
    if (data && data.obtenerReservas) {
      const reservasConFechas = data.obtenerReservas.map((reserva: FlightReservationData) => ({
        ...reserva,
        fecha: new Date(parseInt(reserva.fecha, 10)).toISOString().split('T')[0],  
      }));
      setReservas(reservasConFechas);  
    }
  }, [data]);

  useEffect(() => {
    if ((clienteData && clienteData.getClienteByCedula) != null) {
      const { nombre, apellido, sexo } = clienteData.getClienteByCedula;
      setFormData(prevData => ({
        ...prevData,
        nombre: `${nombre} ${apellido}`, 
        genero: sexo
      }));
    }else{
      clearForm()
    }
  }, [clienteData]);

  useEffect(() => {
    if ((vueloData && vueloData.getVuelo.codigo) != null &&  (formData.origen != '' && formData.origen != '' )) {
      const { codigo, numeroAsientosTotales } = vueloData.getVuelo;
      setFormData(prevData => ({
        ...prevData,
        vuelo: codigo,
        asientos: numeroAsientosTotales
      }));
    console.log(numeroAsientosTotales)

    }else{
      if (formData.origen != '' && formData.origen != '' ) {
          const message =`No existen vuelos disponibles de <strong>${formData.origen}</strong> a <strong>${formData.destino}</strong>.`
          alert(2, 'Error', message)
      }
      setFormData(prevData => ({
          ...prevData,
        vuelo: '',
        asientos: '',
      }));
    }

  }, [vueloData]);

  return (
    <Layout>
       <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
          button {
            margin-right: 5px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }

          button:focus {
            outline: none;
          }

          .status {
            font-weight: bold;
          }

          .active {
            background-color: green;
            color: white; 
            padding: 8px;
            border-radius: 20px; 
            justify-content: center; 
            margin-left: 35px;
          }

          .inactive {
            background-color: red;
            color: white; 
            padding: 8px;
            border-radius: 20px; 
            justify-content: center; 
            margin-left: 30px;
          }
          
          .title {
            margin-bottom: 25px;
          }
        `}
      </style>
      {!showForm && (
        <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg" >
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl title text-blue-600">Reservas</h1>
          </div>
          <div>
          <button
            onClick={handleGenerateNewReservation}
            className="mt-6 mb-6 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Nueva Reserva
          </button>
          </div>
          <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código de Vuelo</th>
              <th>Fecha</th>
              <th>Cédula</th>
              <th>Estado de Reserva</th>
              <th>Clase</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.codigoVuelo}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.cedula}</td>
                <td style={{alignItems: 'center'}}>
                  <span  className={`status ${reserva.estadoReserva === 'ACT' ? 'active' : 'inactive'}`}>
                    {reserva.estadoReserva === 'ACT' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{reserva.clase}</td>
                <td>
                  {/* <button 
                    style={{
                      borderRadius: '25px', 
                      padding: '10px 15px', 
                      border: 'none', 
                      backgroundColor: '#007BFF', 
                      color: '#fff', 
                      cursor: 'pointer', 
                      alignItems: 'center', 
                    }}
                    title="Editar reserva"
                    onClick={() => handleEdit(reserva)}><FontAwesomeIcon icon={faEdit} /></button> */}
                  <button 
                    style={{
                      borderRadius: '25px', 
                      padding: '10px 15px', 
                      border: 'none', 
                      backgroundColor: '#007BFF', 
                      color: '#fff', 
                      cursor: 'pointer', 
                      alignItems: 'center', 
                    }}
                    title="Eliminar reserva"
                    onClick={() => handleDelete(reserva)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

      )}
      {showForm && (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-blue-800">Reserva de Vuelo</h1>
          {/* <Card className="w-[400px] p-6"></Card> */}
          <Forms.Root className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-9">
            {/* Cédula */}
            <Forms.Field name="cedula" className="flex flex-col">
              <Forms.Label className="text-m font-medium mb-2">Cédula</Forms.Label>
              <Forms.Control asChild>
                <input 
                  type="text"
                  className="border rounded-md p-3"
                  name="cedula"
                  value={formData.cedula}
                  /* onChange={(e) => setFormData({...formData, cedula: e.target.value})} */
                  onChange={handleChange}
                />
              </Forms.Control>
            </Forms.Field>
            <button 
                    style={{
                      borderRadius: '25px', 
                      border: 'none', 
                      backgroundColor: '#007BFF', 
                      color: '#fff', 
                      cursor: 'pointer', 
                      alignItems: 'center', 
                      width:'215px',
                      maxHeight:'40px',
                      marginTop:'30px',
                    }}
                    title="Buscar Usuario"
                    onClick={(e) => handleFetchReservas(formData.cedula, e)}
                  >
                    <FontAwesomeIcon icon={faSearch} /> <span> {" Buscar Usuario "} </span>
            </button>
            {/* Nombre */}
            <Forms.Field name="nombre" className="flex flex-col">
              <Forms.Label className="text-m font-medium mb-2">Nombre</Forms.Label>
              <Forms.Control asChild>
                <input 
                  type="text"
                  className="border rounded-md p-3 bg-gray-100"
                  value={formData.nombre}
                  onChange={handleChange}
                  readOnly
                />
              </Forms.Control>
            </Forms.Field>
            
            {/* Genero */}
            <Forms.Field name="genero" className="flex flex-col">
              <Forms.Label className="text-m font-medium mb-2">Genero</Forms.Label>
              <Forms.Control asChild>
                <input 
                  type="text"
                  className="border rounded-md p-3 bg-gray-100"
                  value={formData.genero}
                  onChange={handleChange}
                  readOnly
                />
              </Forms.Control>
            </Forms.Field>

            {/* Origen */}
            <Forms.Field name="origen" className="flex flex-col">
              <Forms.Label className="text-m font-medium mb-1">Origen</Forms.Label>
                <select
                  name="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                >
                  <option value=""> -- Elige una ciudad -- </option>
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
            </Forms.Field>

            {/* Destino */}
            <Forms.Field name="destino" className="flex flex-col">
              <Forms.Label className="text-sm font-medium mb-1">Destino</Forms.Label>
              <select
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                >
                  <option value=""> -- Elige una ciudad -- </option>
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
              </select>
            </Forms.Field>

            {/* Vuelo */}
            <Forms.Field name="vuelo" className="flex flex-col">
              <Forms.Label className="text-sm font-medium mb-1">Vuelo</Forms.Label>
              <Forms.Control asChild>
                <input 
                  type="text"
                  className="border rounded-md p-3 bg-gray-100"
                  value={formData.vuelo}
                  onChange={handleChange}
                  readOnly
                />
              </Forms.Control>
            </Forms.Field>
            
            {/* Asientos */}
            <Forms.Field name="asientos" className="flex flex-col">
              <Forms.Label className="text-sm font-medium mb-1">Asientos</Forms.Label>
              <Forms.Control asChild>
                <input 
                  type="text"
                  className="border rounded-md p-3 bg-gray-100"
                  value={formData.asientos}
                  onChange={handleChange}
                  readOnly
                />
              </Forms.Control>
            </Forms.Field>

            {/* Fecha */}
            <Forms.Field name="fecha" className="flex flex-col">
              <Forms.Label className="text-sm font-medium mb-1">Fecha</Forms.Label>
              <input
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
            </Forms.Field>
          </div>

          {/* Clase */}
          <Forms.Field name="clase" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Clase</Forms.Label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="clase"
                  value="PREMIUM"
                  className="mr-2"
                  checked={formData.clase === 'PREMIUM'}
                  onChange={(e) => setFormData({...formData, clase: 'PREMIUM' as const})}
                />
                Premium
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="clase"
                  value="ECONÓMICA"
                  className="mr-2"
                  checked={formData.clase === 'ECONÓMICA'}
                  onChange={(e) => setFormData({...formData, clase: 'ECONÓMICA' as const})}
                />
                Business
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="clase"
                  value="BÁSICA"
                  className="mr-2"
                  checked={formData.clase === 'BÁSICA'}
                  onChange={(e) => setFormData({...formData, clase: 'BÁSICA' as const})}
                />
                Basic
              </label>
            </div>
          </Forms.Field>

          {/* Submit Button */}
          <button 
            style={{
              borderRadius: '25px', 
              padding: '10px 15px', 
              border: 'none', 
              backgroundColor: 'red', 
              color: '#fff', 
              cursor: 'pointer', 
              alignItems: 'center', 
              width: '150px'
            }}
            title="Eliminar reserva"
            onClick={() => handleCancel()}
          >
            <FontAwesomeIcon icon={faBan} /> Cancelar
          </button>
          <Forms.Submit asChild>
            <button style={{
              borderRadius: '25px', 
              padding: '10px 15px', 
              border: 'none', 
              backgroundColor: 'primary', 
              color: '#fff', 
              cursor: 'pointer', 
              alignItems: 'center', 
              margin:'15px 0px 0px 0px',
              width: '180px'
            }}>
              <FontAwesomeIcon icon={faFloppyDisk} /> <span> {(!isUpdate ? 'Guardar' : 'Actualizar' ) + " Reserva"} </span>
              
            </button>
          </Forms.Submit>
          </Forms.Root>
        </div>
      )}
    </Layout>
  )
}
