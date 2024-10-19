// src/pages/Users/user-list.tsx
import { useUsers, useAuth } from '@/sections/shared/hooks'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { UserRow } from './user-row'

export const UsersList = () => {
  const { users } = useUsers()
  const { user } = useAuth()

  return (
    <Card className="w-full">
      <Table>
        <TableCaption>Lista de Usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Password</TableHead>
            {user && <TableHead>Acciones</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map(({ id, userName, userPassword }) => (
            <UserRow
              key={id}
              id={id}
              userName={userName}
              userPassword={userPassword}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}