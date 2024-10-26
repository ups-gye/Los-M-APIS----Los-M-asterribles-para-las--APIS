// src/sections/clients/pages/client-row.tsx
import { useClients } from '@/sections/shared/hooks/useClients'
import { TableCell, TableRow } from '@/components/ui/table'
import { RotateCw, Trash2 } from 'lucide-react'
import { Client } from '@/modules/clients/domain/Client'
import { format } from 'date-fns'

export const ClientRow: React.FC<Client> = ({
  dni,
  name,
  lastName,
  birthDate,
  gender,
  email,
}) => {
  const { handleDeleteClient, onSelectedClientForm } = useClients()

  const formattedDate = birthDate ? format(new Date(birthDate), 'dd/MM/yyyy') : '';
  
  const genderMap: { [key: string]: string } = {
    'M': 'Masculino',
    'F': 'Femenino',
    'O': 'Otro'
  };

  return (
    <TableRow>
      <TableCell>{dni}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{genderMap[gender] || gender}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell className="flex flex-row gap-2">
        <button
          onClick={() =>
            onSelectedClientForm({
              dni,
              name,
              lastName,
              birthDate,
              gender,
              email,
            })
          }
        >
          <RotateCw className="size-5 text-zinc-500 hover:cursor-pointer" />
        </button>
        <button onClick={() => handleDeleteClient(dni)}>
          <Trash2 className="size-5 text-red-500 hover:cursor-pointer" />
        </button>
      </TableCell>
    </TableRow>
  )
}