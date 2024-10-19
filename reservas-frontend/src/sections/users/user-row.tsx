// src/pages/Users/user-row.tsx
import { useUsers, useAuth } from '@/sections/shared/hooks'
import { TableCell, TableRow } from '@/components/ui/table'
// import { RotateCw, Trash2, Edit3 } from 'lucide-react'
import { RotateCw, Trash2 } from 'lucide-react'

export interface UserRowProps {
  id: number
  userName: string
  userPassword: string
}

export const UserRow: React.FC<UserRowProps> = ({
  id,
  userName,
  userPassword,
}) => {
  const { handleDeleteUser, onSelectedUserForm } = useUsers()
  const { user } = useAuth()

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{userPassword}</TableCell>

      {user && (
        <TableCell className="flex flex-row gap-2">
          <button
            onClick={() =>
              onSelectedUserForm({
                id,
                userName,
                userPassword,
              })
            }
          >
            <RotateCw className="size-5 text-zinc-500 hover:cursor-pointer" />
          </button>
          <button onClick={() => handleDeleteUser(id)}>
            <Trash2 className="size-5 text-red-500 hover:cursor-pointer" />
          </button>
        </TableCell>
      )}
    </TableRow>
  )
}