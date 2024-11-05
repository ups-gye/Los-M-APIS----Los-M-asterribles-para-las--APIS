// src/pages/Users/page.tsx
/* import { useCallback, useEffect } from 'react' */
/* import { useParams } from 'react-router-dom' */
// import { useUsers, useAuth } from '@/sections/shared/hooks'
/* import { useUsers } from '@/sections/shared/hooks' */
import { Layout } from '@/components/Layout'
/* import { UserForm, UsersList } from '.' */
/* import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert' */
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from '@/modules/users/domain/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

/* import { Skeleton } from '@/components/ui/skeleton' */
/* import { AlertCircle } from 'lucide-react' */



import * as Forms from '@radix-ui/react-form';
import { Calendar, Space } from 'lucide-react'
import { useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Tooltip from '@radix-ui/react-tooltip';

interface FlightReservationData {
  cedula: string;
  nombre: string;
  origen: string;
  destino: string;
  vuelo: string;
  fecha: string;
  clase: 'premium' | 'business' | 'basic';
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

export function BookingPage() {

/*   const { loading, error, data } = useQuery(OBTENER_RESERVAS);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log("esta es la info", data?.obtenerReservas) */

const [reservas, setReservas] = useState<any[]>([]);
const [getReservas, { loading, error} ] = useLazyQuery(OBTENER_RESERVAS, {
  onCompleted: (data) => {
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    setReservas(data.obtenerReservas); // Actualiza el estado con los datos obtenidos
    console.log(data.obtenerReservas); // Muestra las reservas en la consola
    console.log("estas son las reservas", reservas)

      setFormData(prevData => ({
        ...prevData,
        nombre: 'Luis',
        cedula: cedula,
      }));

  },
});

const handleFetchReservas = (e: React.FormEvent) => {
  e.preventDefault();
  getReservas(); // Llama a la consulta cuando se hace clic en el botón
};

/*   useEffect(( )=>{
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ mutation:
        guardarReserva(codigoVuelo: "FL449", fecha: "2025-12-26", cedula: "0105630388", estadoReserva: "ACT", clase:"ECONÓMICA" ) 
      })
    })
  }) */

/*   const { loading, error, data } = useQuery(OBTENER_RESERVAS);
if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log(data)
 */


  const [formData, setFormData] = useState<FlightReservationData>({
    cedula: '',
    nombre: '',
    origen: '',
    destino: '',
    vuelo: '',
    fecha: '',
    clase: 'basic'
  });
  const [cedula, setCedula] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
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
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEdit = (obj: FlightReservationData) => {
    // Lógica para editar la reserva
    console.log('Editar reserva con ID:', obj);
    console.log('ID:', obj.id);

  };

  const handleDelete = (id: number) => {
    setReservas(reservas.filter(reserva => reserva.id !== id));
    console.log('Eliminar reserva con ID:', id);
  };

  return (
    <Layout>
     {/*  <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Reservas</h1>
      </div>
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            
          <Card className="w-[400px] p-6 border-0">
            <Form {...form}>
              <form onSubmit={validateClient} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su cédula" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </form>
            </Form> 
            <div className="text-left">
                <Button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200" style={{ marginTop: 20}}>
                  Buscar Usuario
                </Button>
            </div>
          </Card>
          </div>
        </div>
      </div> */}
       <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 1em;
            text-align: left;
          }

          th, td {
            padding: 12px 15px;
            border: 1px solid #dddddd;
          }

          th {
            background-color: #f2f2f2;
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
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
        `}
      </style>
      <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg" >
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
              <td>{reserva.estadoReserva}</td>
              <td>{reserva.clase}</td>
              <td>
                <button 
                  style={{
                    borderRadius: '12px', 
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
                    borderRadius: '12px', 
                    padding: '10px 15px', 
                    border: 'none', 
                    backgroundColor: '#007BFF', 
                    color: '#fff', 
                    cursor: 'pointer', 
                    alignItems: 'center', 
                  }}
                   title="Eliminar reserva"
                  onClick={() => handleDelete(reserva.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
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

      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Reserva de Vuelo</h1>
        {/* <Card className="w-[400px] p-6"></Card> */}
        <Forms.Root className="space-y-4" onSubmit={handleSubmit}>
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
            <Forms.Label className="text-m font-medium mb-1">Nombre</Forms.Label>
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
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-3"
                value="bucar"
                readOnly
              />
            </Forms.Control>
          </Forms.Field>

          {/* Destino */}
          <Forms.Field name="destino" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Destino</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-2 bg-gray-100"
                value="Código vuelo"
                readOnly
              />
            </Forms.Control>
          </Forms.Field>

          {/* Vuelo */}
          <Forms.Field name="vuelo" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Vuelo</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-2 bg-gray-100"
                value="total asientos 136"
                readOnly
              />
            </Forms.Control>
          </Forms.Field>

          {/* Fecha */}
          <Forms.Field name="fecha" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Fecha</Forms.Label>
            <div className="relative">
              <Forms.Control asChild>
                <input
                  type="date"
                  className="border rounded-md p-2 w-full"
                  defaultValue="2024-10-14"
                />
              </Forms.Control>
              <Calendar className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
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
                value="premium"
                className="mr-2"
                checked={formData.clase === 'premium'}
                onChange={(e) => setFormData({...formData, clase: 'premium' as const})}
              />
              Premium
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="clase"
                value="business"
                className="mr-2"
                checked={formData.clase === 'business'}
                onChange={(e) => setFormData({...formData, clase: 'business' as const})}
              />
              Business
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="clase"
                value="basic"
                className="mr-2"
                checked={formData.clase === 'basic'}
                onChange={(e) => setFormData({...formData, clase: 'basic' as const})}
              />
              Basic
            </label>
          </div>
        </Forms.Field>

        {/* Submit Button */}
        <Forms.Submit asChild>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
            Guardar Reserva
          </button>
        </Forms.Submit>
        </Forms.Root>
      </div>
    </Layout>
  )
}
