// src/sections/clients/pages/client-list.tsx
import { useClients } from '@/sections/shared/hooks/useClients'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { ClientRow } from './client-row'

export const ClientList = () => {
  const { clients } = useClients()

  return (
    <Card className="w-full overflow-auto">
      <Table>
        <TableCaption>Lista de Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>DNI</TableHead>
            <TableHead>Nombres</TableHead>
            <TableHead>Apellidos</TableHead>
            <TableHead>Fecha Nac.</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((client) => (
            <ClientRow
              key={client.dni}
              {...client}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}