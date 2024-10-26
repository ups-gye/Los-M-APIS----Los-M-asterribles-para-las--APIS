// src/sections/clients/pages/client-form.tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useClients } from '@/sections/shared/hooks/useClients'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Client } from '@/modules/clients/domain/Client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const clientSchema = z.object({
  dni: z.string()
    .min(10, { message: 'El DNI debe tener al menos 10 caracteres.' })
    .max(13, { message: 'El DNI no puede tener más de 13 caracteres.' }),
  name: z.string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  lastName: z.string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
  birthDate: z.string()
    .min(1, { message: 'La fecha de nacimiento es requerida.' }),
  gender: z.string()
    .min(1, { message: 'El género es requerido.' }),
  email: z.string()
    .email({ message: 'Debe ser un email válido.' })
})

type ClientFormData = z.infer<typeof clientSchema>

interface Props {
  clientSelected: Client | null
  onCloseForm: () => void
}

export function ClientForm({ clientSelected, onCloseForm }: Props) {
  const { handleAddClient, handleUpdateClient, errors } = useClients()

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: clientSelected || {
      dni: '',
      name: '',
      lastName: '',
      birthDate: '',
      gender: '',
      email: ''
    }
  })

  const onSubmit = async (data: ClientFormData) => {
    if (clientSelected?.dni) {
      await handleUpdateClient(clientSelected.dni, data)
    } else {
      await handleAddClient(data)
    }
    form.reset()
    onCloseForm()
  }

  useEffect(() => {
    if (clientSelected) {
      form.reset(clientSelected)
    }
  }, [clientSelected, form])

  return (
    <div className="flex flex-col w-full">
      <Card className="w-[400px] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI/Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el DNI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese los nombres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese los apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                      <SelectItem value="O">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ingrese el email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {clientSelected?.dni ? 'Actualizar' : 'Crear'}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={onCloseForm}
              >
                Cerrar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}