import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUsers } from '@/sections/shared/hooks/useUsers'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from '@/modules/users/domain/User'
import { Checkbox } from '@/components/ui/checkbox'

const userSchema = z.object({
  id: z.number().optional(),
  userName: z.string().min(1, { message: 'El username es requerido.' }),
  userPassword: z.string().optional(),
  changePassword: z.boolean().default(false),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.changePassword) {
    if (!data.newPassword || data.newPassword.length < 5) {
      ctx.addIssue({
        code: "custom",
        message: "La nueva contraseña debe tener al menos 5 caracteres",
        path: ["newPassword"]
      });
    }
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"]
      });
    }
  }
});

type UserFormData = z.infer<typeof userSchema>

interface Props {
  userSelected: User | null
  onCloseForm: () => void
}

export function UserForm({ userSelected, onCloseForm }: Props) {
  const { handleAddUser, handleUpdateUser } = useUsers()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: userSelected ? {
      ...userSelected,
      changePassword: false,
      newPassword: '',
      confirmPassword: ''
    } : {
      userName: '',
      userPassword: '',
      changePassword: false,
      newPassword: '',
      confirmPassword: ''
    }
  })

  const changePassword = form.watch('changePassword');

  const onSubmit = async (data: UserFormData) => {
    try {
      if (userSelected?.id) {
        await handleUpdateUser({
          id: userSelected.id,
          userName: data.userName,
          userPassword: data.changePassword ? data.newPassword! : userSelected.userPassword
        });
      } else {
        await handleAddUser({
          userName: data.userName,
          userPassword: data.userPassword!
        });
      }
      form.reset();
      onCloseForm();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (userSelected) {
      form.reset({
        ...userSelected,
        changePassword: false,
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [userSelected, form])

  return (
    <div className="flex flex-col w-full">
      <Card className="w-[400px] p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            {!userSelected?.id && (
              <FormField
                control={form.control}
                name="userPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ingrese su password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {userSelected?.id && (
              <>
                <FormField
                  control={form.control}
                  name="changePassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Cambiar contraseña
                        </FormLabel>
                        <FormDescription>
                          Marque esta opción si desea actualizar la contraseña
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {changePassword && (
                  <>
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Ingrese la nueva contraseña"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirme la nueva contraseña"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
            )}

            <div className="flex gap-2">
              <Button type="submit">
                {userSelected?.id ? 'Actualizar' : 'Crear'}
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