import { Layout } from '@/components/Layout'
import * as Forms from '@radix-ui/react-form';
import { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { faEdit, faTrash, faFloppyDisk, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

interface FlightReservationData {
  cedula: string;
  nombre: string;
  origen: string;
  destino: string;
  vuelo: string;
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

export function BookingPage() {

  const [reservas, setReservas] = useState<any[]>([]);

/*   const { data: reservasData, refetch } = useQuery(OBTENER_RESERVAS);
  setReservas(reservasData)
  console.log(reservasData) */
/*   const { loading, error, data } = useQuery(OBTENER_RESERVAS);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log("esta es la info", data?.obtenerReservas) */
const [showForm, setShowForm] = useState<boolean>(false);
const [isUpdate, setIsUpdate] = useState<boolean>(false);
const [getReservas, { loading, error, refetch} ] = useLazyQuery(OBTENER_RESERVAS, {
  onCompleted: (data) => {
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const reservasConFechas = data.obtenerReservas.map((reserva: FlightReservationData) => ({
      ...reserva,
      fecha: new Date(parseInt(reserva.fecha, 10)).toISOString().split('T')[0],  // Convertir a fecha legible
    }));

    console.log(reservasConFechas)
    setReservas(reservasConFechas);
    /* setReservas(data.obtenerReservas); */ // Actualiza el estado con los datos obtenidos
    /* console.log(data.obtenerReservas); */ // Muestra las reservas en la consola
    console.log("estas son las reservas", reservas)

      

  },
});

const handleFetchReservas = (e: React.FormEvent) => {
  e.preventDefault();
  setFormData(prevData => ({
    ...prevData,
    nombre: 'Luis',
    cedula: cedula,
  }));
  getReservas();
};

  const [formData, setFormData] = useState<FlightReservationData>({
    cedula: '',
    nombre: '',
    origen: '',
    destino: '',
    vuelo: '',
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
            codigoVuelo: "FL559",
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
            codigoVuelo: 'FLYP11',
            fecha: formData.fecha,
            cedula: formData.cedula,
            estadoReserva: 'ACT',
            /* clase: formData.clase.toUpperCase(), */
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
      setFormData({
        cedula: '',
        nombre: '',
        origen: '',
        destino: '',
        vuelo: '',
        fecha: '',
        clase: 'BÁSICA'
      });
      
/*       refetch()
      getReservas(); */
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
  
 /*  const validateClient = (e: React.FormEvent) => {

    e.preventDefault();
    setFormData(prevData => ({
      ...prevData,
      nombre: 'Luis',
      cedula: '0101010',
    }));

  }; */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Campo: ${name}, Valor: ${value}`); // Para debugging

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleEdit = (obj: FlightReservationData) => {
    // Lógica para editar la reserva
    setFormData({
      cedula: obj.cedula,
      nombre: '',
      origen: '',
      destino: '',
      vuelo: '',
      fecha: obj.fecha,
      clase: obj.clase,
      id: obj.id
    });

    console.log('Editar reserva con ID:', formData);
    console.log('ID:', obj.id);
    setShowForm(true);
    setIsUpdate(true);

  };

  const handleDelete = (obj: FlightReservationData) => {
    console.log(obj)
    setReservas(reservas.filter(reserva => reserva.id !== obj.id));
    /* setReservas(reservas.filter(reserva => reserva.estadoReserva !== 'ANU')); */
   /*  console.log('Eliminar reserva con ID:', id); */
  };

  const handleGenerateNewReservation = () => {
    setShowForm(true);
    /* setReservas(reservas.filter(reserva => reserva.estadoReserva !== 'ANU')); */
   /*  console.log('Eliminar reserva con ID:', id); */
  };

  useEffect(() => {
    refetch()
  }, []);

  useEffect(() => {
    if (!showForm || !isUpdate) {
      getReservas()
    }
  }, [showForm, isUpdate]);
  
  useEffect(() => {
    // Este useEffect se ejecuta cada vez que formData cambia
    console.log('Editar reserva con IDs:', formData);
  }, [formData]);

/*   useEffect(() => {
    getReservas();  // Llamada para obtener las reservas
  }, [reservas]);  */
  
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
                    title="Editar reserva"
                    onClick={() => handleEdit(reserva)}><FontAwesomeIcon icon={faEdit} /></button>
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
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Consultar Usuarios</h1>
        {/* <Card className="w-[400px] p-6"></Card> */}
        <Forms.Root className="space-y-4" onSubmit={handleFetchReservas}>
          {/* Cédula */}
          <Forms.Field name="cedula" className="flex flex-col">
            <Forms.Label className="text-m font-medium mb-2">Cédula</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-3"
                placeholder="Ingrese su cédula"
                name="cedula"
                value={cedula}
                id="cedula"
                onChange={(e) => setCedula( e.target.value)}
              />
            </Forms.Control>
          </Forms.Field>

        {/* Submit Button */}
        <Forms.Submit asChild>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
          Buscar Usuario
          </button>
        </Forms.Submit>
        </Forms.Root>
      </div>
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
                  /* onChange={(e) => setFormData({...formData, nombre: e.target.value})} */
                  /* onChange={validateClient} */
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
                  value="total asientos 136"
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
