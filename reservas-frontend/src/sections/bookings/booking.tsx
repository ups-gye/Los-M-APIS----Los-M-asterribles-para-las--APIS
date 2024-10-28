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
import { Calendar } from 'lucide-react'
import { useState } from 'react'



const userSchema = z.object({
  userName: z.string().min(1, "El nombre de usuario es requerido"),
});

interface Props {
  userSelected: User | null
  onCloseForm: () => void
}


type UserFormData = z.infer<typeof userSchema>;

interface FlightReservationData {
  cedula: string;
  nombre: string;
  origen: string;
  destino: string;
  vuelo: string;
  fecha: string;
  clase: 'premium' | 'business' | 'basic';
}

export function BookingPage({ userSelected, onCloseForm }: Props) {
/*   const { page } = useParams() */



/*   type FormReservation = {
    userName: string,
  }
 */
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: userSelected ? {
      userName: userSelected.userName, // Cargar el nombre del usuario si existe
    } : {
      userName: '', // Valor predeterminado si no hay usuario seleccionado
    },
  });

  const [formData, setFormData] = useState<FlightReservationData>({
    cedula: '',
    nombre: '',
    origen: '',
    destino: '',
    vuelo: '',
    fecha: '',
    clase: 'basic'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Reservas</h1>
      </div>
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            
          <Card className="w-[400px] p-6">
            <Form {...form}>
              <form /* onSubmit={form.handleSubmit(onsubmit)} */ className="space-y-6">
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </form>
            </Form> 
            <div className="text-left">
                <Button className="mb-2" >
                  Agregar Usuario
                </Button>
            </div>
          </Card>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Reserva de Vuelo</h1>
        <Forms.Root className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Cédula */}
          <Forms.Field name="cedula" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Cédula</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-2"
                value={formData.cedula}
                readOnly
              />
            </Forms.Control>
          </Forms.Field>

          {/* Nombre */}
          <Forms.Field name="nombre" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Nombre</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-2 bg-gray-100"
                value="xxx xxxx"
                readOnly
              />
            </Forms.Control>
          </Forms.Field>

          {/* Origen */}
          <Forms.Field name="origen" className="flex flex-col">
            <Forms.Label className="text-sm font-medium mb-1">Origen</Forms.Label>
            <Forms.Control asChild>
              <input 
                type="text"
                className="border rounded-md p-2"
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
