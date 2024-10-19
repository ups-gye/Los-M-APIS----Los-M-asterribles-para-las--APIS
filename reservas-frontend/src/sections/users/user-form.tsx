// src/pages/Users/user-form.tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUsers } from '@/sections/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from '@/modules/users/domain/User'

const userSchema = z.object({
  id: z.number().optional(),
  userName: z.string().min(1, { message: 'El username es requerido.' }),
  userPassword: z.string().min(5, { message: 'El password debe tener al menos 5 caracteres.' }),
})

type UserFormData = z.infer<typeof userSchema>

interface Props {
  // userSelected: UserFormData | null
  userSelected: User | null
  onCloseForm: () => void
}

export function UserForm({ userSelected, onCloseForm }: Props) {
  const { handleAddUser, handleUpdateUser, errors } = useUsers()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: userSelected || { userName: '', userPassword: '' }
  })

  const onSubmit = (data: UserFormData) => {
    // if (userSelected?.id) {
    //   handleUpdateUser(data)
    if (userSelected && userSelected.id !== undefined) {
      handleUpdateUser({ ...data, id: userSelected.id })
    } else {
      handleAddUser(data)
    }
    form.reset()
    onCloseForm()
  }

  useEffect(() => {
    if (userSelected) {
      form.reset(userSelected)
    }
  }, [userSelected, form])

  return (
    <div className="flex flex-col w-full">
      <Card className="w-[400px] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su username" {...field} />
                  </FormControl>
                  <FormMessage>{errors?.userName}</FormMessage>
                </FormItem>
              )}
            />
            {!userSelected?.id && (
              <FormField
                control={form.control}
                name="userPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ingrese una contraseña segura
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit">
              {userSelected?.id ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
              type="button"
              className="mx-2"
              variant="destructive"
              onClick={onCloseForm}
            >
              Cerrar
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}